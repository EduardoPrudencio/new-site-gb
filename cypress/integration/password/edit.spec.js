/* eslint-disable no-undef */
/* eslint-disable func-names */
/// <reference types="cypress" />

const siteId = "8CzkqnNkLDSi-dyFi8Kc";

const token = "wEDA6cPrBwD6izsDceW_";

const loginToken = {
  token:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJiYTgzZjcwOC1hZjY4LTRjZjUtYmRmZS0yZjUyMDkyZGJhZDQiLCJpYXQiOjE2NDg1ODA1ODMsImV4cCI6MTY0ODU4Nzc4M30.zIgHCWBkiqFTRZzloMz8pDNnH27e3S2tFsjPZ3GSIag"
};

describe("Reset Password using email", function() {
  before(() => {
      cy.intercept("GET", `**/v1/customers/password/${token}`, {
      statusCode: 200
    });

    cy.visit(`/password/edit/${token}`);
  });

  it("should change the password", () => {
    cy.intercept("GET", `**/v1/customers/password/${token}`, {
      statusCode: 200
    });

    cy.visit(`/password/edit/${token}`);

    const password = "testCypress";
    cy.get("[data-cy=password]").type(password, { delay: 100 });
    cy.get("[data-cy=passwordConfirmation]").type(password, { delay: 100 });
    cy.get("[data-cy=save]").click();

    cy.intercept("PATCH", `**/v2/customers/password/${token}`, req => {
      req.reply(
        {
          headers: { "x-api-key": siteId },
          statusCode: 200
        }.as("passwordReset")
      );

      cy.wait("@passwordReset")
        .its("request.body.customer")
        .should("include", { password, password_confirmation, token });
    });
  });  

  it("should redirect to home if token is invalid", () => {
    cy.intercept("GET", `**/v1/customers/password/${token}`, {
      statusCode: 404
    });

    cy.visit(`/password/edit/${token}`);
    cy.visit(`/`);
  })
});