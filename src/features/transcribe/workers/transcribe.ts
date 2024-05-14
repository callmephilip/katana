import { expose } from "comlink";
/* eslint-disable camelcase */
import { pipeline, env } from "@xenova/transformers";

// Disable local models
env.allowLocalModels = false;

// Define model factories
// Ensures only one model is created of each type
class PipelineFactory {
  static task = null;
  static model = null;
  static quantized = null;
  static instance = null;

  // @ts-ignore
  constructor(tokenizer, model, quantized) {
    // @ts-ignore
    this.tokenizer = tokenizer;
    // @ts-ignore
    this.model = model;
    // @ts-ignore
    this.quantized = quantized;
  }

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      // @ts-ignore
      this.instance = pipeline(this.task, this.model, {
        quantized: this.quantized,
        progress_callback,

        // For medium models, we need to load the `no_attentions` revision to avoid running out of memory
        // @ts-ignore
        revision: this.model.includes("/whisper-medium")
          ? "no_attentions"
          : "main",
      });
    }

    return this.instance;
  }
}

// self.addEventListener("message", async (event) => {
//   const message = event.data;

//   // Do some work...
//   // TODO use message data
//   let transcript = await transcribe(
//     message.audio,
//     message.model,
//     message.multilingual,
//     message.quantized,
//     message.subtask,
//     message.language
//   );
//   if (transcript === null) return;

//   // Send the result back to the main thread
//   self.postMessage({
//     status: "complete",
//     task: "automatic-speech-recognition",
//     data: transcript,
//   });
// });

// @ts-ignore
class AutomaticSpeechRecognitionPipelineFactory extends PipelineFactory {
  static task = "automatic-speech-recognition";
  static model = null;
  static quantized = null;
}

expose({
  async transcribe(
    // @ts-ignore
    audio,
    model = "Xenova/whisper-tiny",
    multilingual = false,
    quantized = false,
    subtask = null, //"transcribe",
    language = null //"english"
  ) {
    console.log(
      ">>>>>>>>>>>>>>>>>>> Transcribing audio...",
      audio,
      audio.length,
      model,
      multilingual,
      quantized,
      subtask,
      language
    );

    const isDistilWhisper = model.startsWith("distil-whisper/");

    let modelName = model;
    if (!isDistilWhisper && !multilingual) {
      modelName += ".en";
    }

    const p = AutomaticSpeechRecognitionPipelineFactory;
    if (p.model !== modelName || p.quantized !== quantized) {
      // Invalidate model if different
      // @ts-ignore
      p.model = modelName;
      // @ts-ignore
      p.quantized = quantized;

      if (p.instance !== null) {
        // @ts-ignore
        (await p.getInstance()).dispose();
        p.instance = null;
      }
    }

    // Load transcriber model
    // @ts-ignore
    let transcriber = await p.getInstance((data) => {
      self.postMessage(data);
    });

    const time_precision =
      // @ts-ignore
      transcriber.processor.feature_extractor.config.chunk_length /
      // @ts-ignore
      transcriber.model.config.max_source_positions;

    // Storage for chunks to be processed. Initialise with an empty chunk.
    let chunks_to_process = [
      {
        tokens: [],
        finalised: false,
      },
    ];

    // TODO: Storage for fully-processed and merged chunks
    // let decoded_chunks = [];

    // @ts-ignore
    function chunk_callback(chunk) {
      console.log(">>>>>>>>>>>>>>>>>>> Chunk callback", chunk);
      let last = chunks_to_process[chunks_to_process.length - 1];

      // Overwrite last chunk with new info
      Object.assign(last, chunk);
      last.finalised = true;

      // Create an empty chunk after, if it not the last chunk
      if (!chunk.is_last) {
        chunks_to_process.push({
          tokens: [],
          finalised: false,
        });
      }
    }

    // Inject custom callback function to handle merging of chunks
    // @ts-ignore
    function callback_function(item) {
      console.log(">>>>>>>>>>>>>>>>>>> Callback function", item);
      let last = chunks_to_process[chunks_to_process.length - 1];

      // Update tokens of last chunk
      // @ts-ignore
      last.tokens = [...item[0].output_token_ids];

      // Merge text chunks
      // TODO optimise so we don't have to decode all chunks every time
      // @ts-ignore
      let data = transcriber.tokenizer._decode_asr(chunks_to_process, {
        time_precision: time_precision,
        return_timestamps: true,
        force_full_sequences: false,
      });

      self.postMessage({
        status: "update",
        task: "automatic-speech-recognition",
        data: data,
      });

      console.log(">>>>>>>>>>>>>>>>>>> Callback function    ", data);
    }

    // Actually run transcription
    // @ts-ignore
    let output = await transcriber(audio, {
      // Greedy
      top_k: 0,
      do_sample: false,

      // Sliding window
      chunk_length_s: isDistilWhisper ? 20 : 30,
      stride_length_s: isDistilWhisper ? 3 : 5,

      // Language and task
      language: language,
      task: subtask,

      // Return timestamps
      return_timestamps: true,
      force_full_sequences: false,

      // Callback functions
      callback_function: callback_function, // after each generation step
      chunk_callback: chunk_callback, // after each chunk is processed
      // @ts-ignore
    }).catch((error) => {
      self.postMessage({
        status: "error",
        task: "automatic-speech-recognition",
        data: error,
      });
      return null;
    });

    return output;
  },
});
