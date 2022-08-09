Cypress.Commands.add('login', (overrides = {}) => {
  Cypress.log({
    name: 'loginViaAuth0',
  });

  const options = {
    method: 'POST',
    url: 'dev-5mbtv1i5.us.auth0.com',
    body: {
      grant_type: 'password',
      username: 'hackson5soc@gmail.com',
      password: 'Schoolofcode22',
      client_id: '6kdnFaaEfw7kUAzuKppQUqGXGMV2ZjMb',
      client_secret: 'AD3tkxGwVqN-4pcz9XXXVvPRsxMuLi6eeUZ1aREbINXUqufU4oDTPINO-lPlxzex',
    },
  };
  cy.request(options);
});


// const options = {
//   method: 'POST',
//     url: 'dev-5mbtv1i5.us.auth0.com',

//     body: {
//       username: 'hackson5soc@gmail.com',
//       password: 'Schoolofcode22'
      
//     }
// }

describe('empty spec', () => {
  it('passes', () => {
    cy.visit('https://hackson5bok.vercel.app/home')
  })


  // Login page
// it("displays the login and sign up button by default", () => {
//   cy.contains('Signup');
//   cy.contains('Login').click();
//   cy.visit('')
// });

})

//   it('passes', () => {
//     cy.visit('https://hackson5bok.vercel.app/home')
//   })
