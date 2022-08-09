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

describe("End to End testing for BOK app", () => {
  it("Surprise me page test: user input and search", () => {
    cy.visit("http://localhost:3000/surpriseme");
    cy.get('.SurpriseMe_search__nbXOD').type('horror');
    cy.get('.MuiButton-root').click();
    cy.wait(6000);
    cy.contains('Add to list');
    cy.get('.NavBar_logo__MYO60').click();
    cy.wait(6000);
    });

  it("Homepage: stats graph, search bar and navigation", () => {
    cy.get(':nth-child(6) > .recharts-rectangle').click();
    cy.contains('Jane Austen');
    cy.get(':nth-child(2) > .recharts-rectangle').click();
    cy.contains('Stephen King');
    cy.get(':nth-child(7) > .recharts-rectangle').click();
    cy.contains('George R.R. Martin');
    cy.get('.Home_FavAutChart__VsCR_ > .MuiButton-root');
    cy.get('.Home_container__bCOhY > :nth-child(4)');
    cy.get('.MuiFormControl-root').type('Harry');
    cy.get('[data-testid="SearchIcon"]').click();
    cy.wait(6000);

        });

});
