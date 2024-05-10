describe("file upload", () => {
  it("works with file uploads", () => {
    cy.visit("/");
    cy.dcy("upload-file").selectFile("cypress/fixtures/sample.mp3", {
      // XX: file uploader are is invisible, hence the force
      force: true,
    });
  });
});
