/// <reference types="cypress" />

describe("new Password using email", function() {
  before(() => {
    cy.visit("/password/new");
  });

  it("should input type is email", () => {
    cy.get("[data-cy=email]")
      .should("have.attr", "placeholder")
      .and("equal", "Digite seu e-mail");
  });

  it("should type a valid email", () => {
    const email = "fake@email.com";
    cy.get("[data-cy=email]").type(email, { delay: 100 });

    cy.get("[data-cy=email]")
      .invoke("val")
      .should("match", /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
  });

  it("should submit button text equals Enviar e-mail", () => {
    cy.contains("Enviar e-mail").should("to.have.length", 1);
  });

  it("should go to signin page", () => {
    cy.get("[data-cy=send-email]").click();
    cy.location("pathname").should("eq", "/");
  });
});
