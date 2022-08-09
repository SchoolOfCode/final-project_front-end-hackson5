Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0",
  });

  const options = {
    method: "POST",
    url: "dev-5mbtv1i5.us.auth0.com",
    body: {
      grant_type: "password",
      username: "hackson5soc@gmail.com",
      password: "Schoolofcode22",
      client_id: "6kdnFaaEfw7kUAzuKppQUqGXGMV2ZjMb",
      client_secret:
        "AD3tkxGwVqN-4pcz9XXXVvPRsxMuLi6eeUZ1aREbINXUqufU4oDTPINO-lPlxzex",
    },
  };
  cy.request(options);
});

describe("empty spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/surpriseme");
  });
});
