/// <reference types="cypress" />

const siteId = "8CzkqnNkLDSi-dyFi8Kc";

const loginToken = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiYTgzZjcwOC1hZjY4LTRjZjUtYmRmZS0yZjUyMDkyZGJhZDQiLCJpYXQiOjE2NDg1ODA1ODMsImV4cCI6MTY0ODU4Nzc4M30.zIgHCWBkiqFTRZzloMz8pDNnH27e3S2tFsjPZ3GSIag",
};

const email = "abcdefghi@email.com";
const password = "123456";

describe("Login Page", function () {
  it("should return unauthorized", () => {
    cy.visit(`/signin`);
    cy.get("[data-cy=username]").type(email, { delay: 100 });
    cy.get("[data-cy=password]").type(password, { delay: 100 });
    cy.get("[data-cy=login]").click();

    cy.intercept("POST", "**/v2/customers/sessions", (req) => {
      req.reply({
        headers: { "x-api-key": siteId },
        statusCode: 401,
        body: loginToken,
      });
    });
  });

  it("should login with email", () => {
    cy.visit(`/signin`);
    cy.get("[data-cy=username]").type(email, { delay: 100 });
    cy.get("[data-cy=password]").type(password, { delay: 100 });
    cy.get("[data-cy=login]").click();

    cy.intercept("POST", `**/v2/customers/sessions`, (req) => {
      req.reply(
        {
          headers: { "x-api-key": siteId },
          statusCode: 200,
          body: loginToken,
        }.as("login")
      );

      cy.wait("@login")
        .its("request.body.customer")
        .should("include", { username, password, toSubscription, queryString });

      cy.visit("/account/profile");
    });
  });

  it("should return invalid email", () => {
    cy.visit(`/signin`);
    cy.get("[data-cy=login]").click();
    cy.contains("O campo e-mail/celular é obrigatório").should(
      "to.have.length",
      1
    );
  });

  it("should return invalid password", () => {
    cy.visit(`/signin`);
    cy.get("[data-cy=username]").type(email, { delay: 100 });
    cy.get("[data-cy=login]").click();
    cy.contains("O campo senha é obrigatório").should("to.have.length", 1);
  });

  it("should redirect to signup", () => {
    cy.visit(`/signin`);
    cy.get("[data-cy=signup]").click();
    cy.visit("/signup");
  });
  it("should redirect to password recovery", () => {
    cy.visit(`/signin`);
    cy.get("[data-cy=password-recovery]").click();
    cy.visit("/");
  });
});
