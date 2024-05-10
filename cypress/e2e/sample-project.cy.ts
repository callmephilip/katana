describe("sample project", () => {
  it("works with a sample project preset", () => {
    cy.visit("/");
    cy.dcy("load-sample").click();
    cy.dcy("application-waveform").should("exist");
  });
});
