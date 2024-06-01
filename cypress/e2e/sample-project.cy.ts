describe("sample project", () => {
  it("works with a sample project preset", () => {
    cy.visit("/");
    cy.dcy("load-sample").click();
    cy.dcy("application-waveform").should("exist");
  });

  it("supports downloads", () => {
    cy.visit("/");
    cy.dcy("load-sample").click();
    cy.dcy("application-waveform").should("exist");
    cy.get("[data-role=download-slice-button]").first().click();
  });
});
