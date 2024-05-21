const path = require("path");

describe("FFmpeg", () => {
  it("supports file download", () => {
    cy.visit("/ffmpeg");
    cy.dcy("ffmpeg-loaded").should("exist");
    cy.dcy("download-mp3-from-url").click();

    cy.dcy("download-txt-from-url").click();
    cy.dcy("output").should("contain", "foo");

    cy.dcy("read-file-as-object-url").click();
    cy.dcy("output").should("contain", "blob:http://localhost:3000/");
  });

  it("supports audio slicing", () => {
    cy.visit("/ffmpeg");
    cy.dcy("ffmpeg-loaded").should("exist");
    cy.dcy("slice-audio").click();
    cy.dcy("logs").should("contain", "ffmpeg started");

    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, "test-slice.mp3")).should("exist");
  });
});
