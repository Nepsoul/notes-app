describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note App");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("testing");
    cy.get("#password").type("testing");
    cy.get("#login-button").click();

    cy.contains("testing logged-in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("testing");
      cy.get("input:last").type("testing");
      cy.get("#login-button").click();
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });
  });
});
