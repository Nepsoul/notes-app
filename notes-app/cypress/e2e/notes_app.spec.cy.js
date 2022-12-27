describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "testing",
      username: "testing",
      password: "testing",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note App");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("testing");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.get("#error").should("contain", "Wrong credentials");
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
      cy.login({ username: "testing", password: "testing" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").contains("make important").click();

        cy.contains("second note").contains("make not important");
      });
    });
  });
});
