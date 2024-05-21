import { parseSilenceDetectReport } from "./ffmpeg";

const report = `
ffmpeg started on 20240514 at 21:20:18
Report written to "ffmpeg20240514212018.log"
Log level: 48
Command line:
./ffmpeg nostdin y i /home/source/TEST.mp3 report af "silencedetect=d=0.8" f null 
ffmpeg version 5.1.4 Copyright (c) 20002023 the FFmpeg developers
  built with emcc (Emscripten gcc/clanglike replacement  linker emulating GNU ld) 3.1.40 (5c27e79dd0a9c4e27ef2326841698cdd4f6b5784)
  configuration: targetos=none arch=x86_32 enablecrosscompile disableasm disablestripping disableprograms disabledoc disabledebug disableruntimecpudetect disableautodetect nm=emnm ar=emar ranlib=emranlib cc=emcc cxx=em objcc=emcc depcc=emcc extracflags='I/opt/include O3 msimd128' extracxxflags='I/opt/include O3 msimd128' disablepthreads disablew32threads disableos2threads enablegpl enablelibx264 enablelibx265 enablelibvpx enablelibmp3lame enablelibtheora enablelibvorbis enablelibopus enablezlib enablelibwebp enablelibfreetype enablelibfribidi enablelibass enablelibzimg
  libavutil      57. 28.100 / 57. 28.100
  libavcodec     59. 37.100 / 59. 37.100
  libavformat    59. 27.100 / 59. 27.100
  libavdevice    59.  7.100 / 59.  7.100
  libavfilter     8. 44.100 /  8. 44.100
  libswscale      6.  7.100 /  6.  7.100
  libswresample   4.  7.100 /  4.  7.100
  libpostproc    56.  6.100 / 56.  6.100
Splitting the commandline.
Reading option 'nostdin' ... matched as option 'stdin' (enable or disable interaction on standard input) with argument 0.
Reading option 'y' ... matched as option 'y' (overwrite output files) with argument '1'.
Reading option 'i' ... matched as input url with argument '/home/source/TEST.mp3'.
Reading option 'report' ... matched as option 'report' (generate a report) with argument '1'.
Reading option 'af' ... matched as option 'af' (set audio filters) with argument 'silencedetect=d=0.8'.
Reading option 'f' ... matched as option 'f' (force format) with argument 'null'.
Reading option '' ... matched as output url.
Finished splitting the commandline.
Parsing a group of options: global .
Applying option nostdin (enable or disable interaction on standard input) with argument 0.
Applying option y (overwrite output files) with argument 1.
Applying option report (generate a report) with argument 1.
Successfully parsed a group of options.
Parsing a group of options: input url /home/source/TEST.mp3.
Successfully parsed a group of options.
Opening an input file: /home/source/TEST.mp3.
[NULL @ 0xdea6b0] Opening '/home/source/TEST.mp3' for reading
[file @ 0xdeaa50] Setting default whitelist 'file,crypto,data'
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] Format mov,mp4,m4a,3gp,3g2,mj2 probed with size=2048 and score=100
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] ISO: File Type Major Brand: dash
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] Unknown dref type 0x206c7275 size 12
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 0, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] Before avformat_find_stream_info() pos: 3880 bytes read:32768 seeks:0 nb_streams:1
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] All info found
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] After avformat_find_stream_info() pos: 4251 bytes read:32768 seeks:0 frames:1
Input #0, mov,mp4,m4a,3gp,3g2,mj2, from '/home/source/TEST.mp3':
  Metadata:
    major_brand     : dash
    minor_version   : 0
    compatible_brands: iso6mp41
    creation_time   : 20240318T12:16:26.000000Z
  Duration: 00:19:18.19, start: 0.000000, bitrate: 129 kb/s
  Stream #0:0[0x1](und), 1, 1/44100: Audio: aac (LC) (mp4a / 0x6134706D), 44100 Hz, stereo, fltp, 1 kb/s (default)
    Metadata:
      creation_time   : 20240318T12:16:26.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]
Successfully opened the file.
Parsing a group of options: output url .
Applying option af (set audio filters) with argument silencedetect=d=0.8.
Applying option f (force format) with argument null.
Successfully parsed a group of options.
Opening an output file: .
Successfully opened the file.
Stream mapping:
  Stream #0:0 > #0:0 (aac (native) > pcm_s16le (native))
cur_dts is invalid st:0 (0) [init:0 i_done:0 finish:0] (this is harmless if it occurs once at the start per stream)
[Parsed_silencedetect_0 @ 0xe9e0b0] Setting 'd' to value '0.8'
[graph_0_in_0_0 @ 0xe9e240] Setting 'time_base' to value '1/44100'
[graph_0_in_0_0 @ 0xe9e240] Setting 'sample_rate' to value '44100'
[graph_0_in_0_0 @ 0xe9e240] Setting 'sample_fmt' to value 'fltp'
[graph_0_in_0_0 @ 0xe9e240] Setting 'channel_layout' to value 'stereo'
[graph_0_in_0_0 @ 0xe9e240] tb:1/44100 samplefmt:fltp samplerate:44100 chlayout:stereo
[format_out_0_0 @ 0xe9e690] Setting 'sample_fmts' to value 's16'
[format_out_0_0 @ 0xe9e690] autoinserting filter 'auto_aresample_0' between the filter 'Parsed_silencedetect_0' and the filter 'format_out_0_0'
[AVFilterGraph @ 0xdf0e60] query_formats: 4 queried, 6 merged, 3 already done, 0 delayed
[auto_aresample_0 @ 0xe9eca0] [SWR @ 0xe9ed00] Using fltp internally between filters
[auto_aresample_0 @ 0xe9eca0] ch:2 chl:stereo fmt:fltp r:44100Hz > ch:2 chl:stereo fmt:s16 r:44100Hz
Output #0, null, to 'pipe:':
  Metadata:
    major_brand     : dash
    minor_version   : 0
    compatible_brands: iso6mp41
    encoder         : Lavf59.27.100
  Stream #0:0(und), 0, 1/44100: Audio: pcm_s16le, 44100 Hz, stereo, s16, 1411 kb/s (default)
    Metadata:
      creation_time   : 20240318T12:16:26.000000Z
      handler_name    : ISO Media file produced by Google Inc.
      vendor_id       : [0][0][0][0]
      encoder         : Lavc59.37.100 pcm_s16le
size=N/A time=00:00:00.02 bitrate=N/A speed=N/A    
[silencedetect @ 0xe9e130] silence_start: 1.01619
[silencedetect @ 0xe9e130] silence_end: 1.99524 | silence_duration: 0.979048
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 440320, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 880640, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 1320960, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 1761280, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 2201600, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 2641920, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 3082240, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 3522560, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 3962880, using it for dts
[silencedetect @ 0xe9e130] silence_start: 89.6662
[silencedetect @ 0xe9e130] silence_end: 90.5158 | silence_duration: 0.849546
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 4403200, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 4843520, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 5283840, using it for dts
[silencedetect @ 0xe9e130] silence_start: 120.29
[silencedetect @ 0xe9e130] silence_end: 121.196 | silence_duration: 0.906236
[silencedetect @ 0xe9e130] silence_start: 121.919
[silencedetect @ 0xe9e130] silence_end: 123.181 | silence_duration: 1.26245
[silencedetect @ 0xe9e130] silence_start: 126.983
[silencedetect @ 0xe9e130] silence_end: 128.105 | silence_duration: 1.12152
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 5724160, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 6164480, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 6604800, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 7045120, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 7485440, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 7925760, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 8366080, using it for dts
size=N/A time=00:03:14.81 bitrate=N/A speed= 390x    
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 8806400, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 9246720, using it for dts
[silencedetect @ 0xe9e130] silence_start: 213.738
[silencedetect @ 0xe9e130] silence_end: 214.554 | silence_duration: 0.816145
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 9687040, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 10127360, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 10567680, using it for dts
[silencedetect @ 0xe9e130] silence_start: 242.732
[silencedetect @ 0xe9e130] silence_end: 243.614 | silence_duration: 0.881723
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 11008000, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 11448320, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 11888640, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 12328960, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 12769280, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 13209600, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 13649920, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 14090240, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 14530560, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 14970880, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 15411200, using it for dts
[silencedetect @ 0xe9e130] silence_start: 353.396
[silencedetect @ 0xe9e130] silence_end: 354.56 | silence_duration: 1.16431
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 15851520, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 16291840, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 16732160, using it for dts
size=N/A time=00:06:22.31 bitrate=N/A speed= 382x    
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 17172480, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 17612800, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 18053120, using it for dts
[silencedetect @ 0xe9e130] silence_start: 411.056
[silencedetect @ 0xe9e130] silence_end: 411.912 | silence_duration: 0.855465
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 18493440, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 18933760, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 19374080, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 19814400, using it for dts
[silencedetect @ 0xe9e130] silence_start: 455.428
[silencedetect @ 0xe9e130] silence_end: 456.23 | silence_duration: 0.802041
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 20254720, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 20695040, using it for dts
[silencedetect @ 0xe9e130] silence_start: 469.856
[silencedetect @ 0xe9e130] silence_end: 470.78 | silence_duration: 0.924717
[silencedetect @ 0xe9e130] silence_start: 471.965
[silencedetect @ 0xe9e130] silence_end: 473.114 | silence_duration: 1.14896
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 21135360, using it for dts
[silencedetect @ 0xe9e130] silence_start: 478.812
[silencedetect @ 0xe9e130] silence_end: 479.699 | silence_duration: 0.886667
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 21575680, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 22016000, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 22456320, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 22896640, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 23336960, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 23777280, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 24217600, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 24657920, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 25098240, using it for dts
size=N/A time=00:09:34.97 bitrate=N/A speed= 383x    
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 25538560, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 25978880, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 26419200, using it for dts
[silencedetect @ 0xe9e130] silence_start: 607.532
[silencedetect @ 0xe9e130] silence_end: 608.991 | silence_duration: 1.45878
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 26859520, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 27299840, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 27740160, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 28180480, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 28620800, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 29061120, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 29501440, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 29941760, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 30382080, using it for dts
[silencedetect @ 0xe9e130] silence_start: 691.424
[silencedetect @ 0xe9e130] silence_end: 692.565 | silence_duration: 1.14118
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 30822400, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 31262720, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 31703040, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 32143360, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 32583680, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 33024000, using it for dts
size=N/A time=00:12:38.57 bitrate=N/A speed= 379x    
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 33464320, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 33904640, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 34344960, using it for dts
[silencedetect @ 0xe9e130] silence_start: 784.25
[silencedetect @ 0xe9e130] silence_end: 785.197 | silence_duration: 0.947234
[silencedetect @ 0xe9e130] silence_start: 787.761
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 34785280, using it for dts
[silencedetect @ 0xe9e130] silence_end: 789.031 | silence_duration: 1.27061
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 35225600, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 35665920, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 36106240, using it for dts
[silencedetect @ 0xe9e130] silence_start: 818.238
[silencedetect @ 0xe9e130] silence_end: 819.525 | silence_duration: 1.28701
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 36546560, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 36986880, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 37427200, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 37867520, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 38307840, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 38748160, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 39188480, using it for dts
[silencedetect @ 0xe9e130] silence_start: 894.183
[silencedetect @ 0xe9e130] silence_end: 895.06 | silence_duration: 0.876689
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 39628800, using it for dts
[silencedetect @ 0xe9e130] silence_start: 904.024
[silencedetect @ 0xe9e130] silence_end: 904.948 | silence_duration: 0.923379
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 40069120, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 40509440, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 40949760, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 41390080, using it for dts
size=N/A time=00:15:48.39 bitrate=N/A speed= 379x    
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 41830400, using it for dts
[silencedetect @ 0xe9e130] silence_start: 955.469
[silencedetect @ 0xe9e130] silence_end: 956.272 | silence_duration: 0.803583
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 42270720, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 42711040, using it for dts
[silencedetect @ 0xe9e130] silence_start: 968.091
[silencedetect @ 0xe9e130] silence_end: 969.457 | silence_duration: 1.36642
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 43151360, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 43591680, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 44032000, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 44472320, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 44912640, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 45352960, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 45793280, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 46233600, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 46673920, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 47114240, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 47554560, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 47994880, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 48435200, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 48875520, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 49315840, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 49756160, using it for dts
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 50196480, using it for dts
size=N/A time=00:18:59.61 bitrate=N/A speed= 380x    
[mov,mp4,m4a,3gp,3g2,mj2 @ 0xdea6b0] found tfdt time 50636800, using it for dts
[silencedetect @ 0xe9e130] silence_start: 1151.84
[out_0_0 @ 0xe9e540] EOF on sink link out_0_0:default.
No more output streams to write to, finishing.
size=N/A time=00:19:18.18 bitrate=N/A speed= 381x    
video:0kB audio:199516kB subtitle:0kB other streams:0kB global headers:0kB muxing overhead: unknown
Input file #0 (/home/source/TEST.mp3):
  Input stream #0:0 (audio): 49879 packets read (18531009 bytes); 49879 frames decoded (51076096 samples); 
  Total: 49879 packets (18531009 bytes) demuxed
Output file #0 (pipe:):
  Output stream #0:0 (audio): 49879 frames encoded (51076096 samples); 49879 packets muxed (204304384 bytes); 
  Total: 49879 packets (204304384 bytes) muxed
49879 frames successfully decoded, 0 decoding errors
[silencedetect @ 0xe9e130] silence_end: 1158.19 | silence_duration: 6.34896
[AVIOContext @ 0xdf2b20] Statistics: 18744645 bytes read, 0 seeks
`;

describe("parseSilenceDetectReport", () => {
  it("works", () => {
    expect(parseSilenceDetectReport(report)).toEqual({
      silence: [
        {
          duration: 0.979048,
          end: 1.99524,
          start: 1.01619,
        },
        {
          duration: 0.849546,
          end: 90.5158,
          start: 89.6662,
        },
        {
          duration: 0.906236,
          end: 121.196,
          start: 120.29,
        },
        {
          duration: 1.26245,
          end: 123.181,
          start: 121.919,
        },
        {
          duration: 1.12152,
          end: 128.105,
          start: 126.983,
        },
        {
          duration: 0.816145,
          end: 214.554,
          start: 213.738,
        },
        {
          duration: 0.881723,
          end: 243.614,
          start: 242.732,
        },
        {
          duration: 1.16431,
          end: 354.56,
          start: 353.396,
        },
        {
          duration: 0.855465,
          end: 411.912,
          start: 411.056,
        },
        {
          duration: 0.802041,
          end: 456.23,
          start: 455.428,
        },
        {
          duration: 0.924717,
          end: 470.78,
          start: 469.856,
        },
        {
          duration: 1.14896,
          end: 473.114,
          start: 471.965,
        },
        {
          duration: 0.886667,
          end: 479.699,
          start: 478.812,
        },
        {
          duration: 1.45878,
          end: 608.991,
          start: 607.532,
        },
        {
          duration: 1.14118,
          end: 692.565,
          start: 691.424,
        },
        {
          duration: 0.947234,
          end: 785.197,
          start: 784.25,
        },
        {
          duration: 1.27061,
          end: 789.031,
          start: 787.761,
        },
        {
          duration: 1.28701,
          end: 819.525,
          start: 818.238,
        },
        {
          duration: 0.876689,
          end: 895.06,
          start: 894.183,
        },
        {
          duration: 0.923379,
          end: 904.948,
          start: 904.024,
        },
        {
          duration: 0.803583,
          end: 956.272,
          start: 955.469,
        },
        {
          duration: 1.36642,
          end: 969.457,
          start: 968.091,
        },
        {
          duration: 6.34896,
          end: 1158.19,
          start: 1151.84,
        },
      ],
      sound: [
        {
          duration: 89.6662,
          end: 89.6662,
          start: 0,
        },
        {
          duration: 29.774200000000008,
          end: 120.29,
          start: 90.5158,
        },
        {
          duration: 92.542,
          end: 213.738,
          start: 121.196,
        },
        {
          duration: 28.177999999999997,
          end: 242.732,
          start: 214.554,
        },
        {
          duration: 109.78200000000001,
          end: 353.396,
          start: 243.614,
        },
        {
          duration: 56.49599999999998,
          end: 411.056,
          start: 354.56,
        },
        {
          duration: 43.51600000000002,
          end: 455.428,
          start: 411.912,
        },
        {
          duration: 13.625999999999976,
          end: 469.856,
          start: 456.23,
        },
        {
          duration: 136.75200000000007,
          end: 607.532,
          start: 470.78,
        },
        {
          duration: 82.43299999999999,
          end: 691.424,
          start: 608.991,
        },
        {
          duration: 91.68499999999995,
          end: 784.25,
          start: 692.565,
        },
        {
          duration: 33.041000000000054,
          end: 818.238,
          start: 785.197,
        },
        {
          duration: 74.65800000000002,
          end: 894.183,
          start: 819.525,
        },
        {
          duration: 60.409000000000106,
          end: 955.469,
          start: 895.06,
        },
        {
          duration: 11.81899999999996,
          end: 968.091,
          start: 956.272,
        },
        {
          duration: 182.38299999999992,
          end: 1151.84,
          start: 969.457,
        },
      ],
    });
  });
});
