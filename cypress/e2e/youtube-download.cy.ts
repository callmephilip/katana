describe("youtube download", () => {
  it("supports downloading audio from youtube", () => {
    cy.visit("/");
    cy.dcy("tab-youtube-download").click();
    cy.dcy("youtube-video-url").type(
      "https://www.youtube.com/watch?v=ipRvjS7q1DI"
    );
    cy.dcy("youtube-download-audio").click();
    cy.dcy("application-waveform").should("exist");
  });
});
