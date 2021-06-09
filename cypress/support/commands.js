// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
//Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-file-upload';

Cypress.Commands.add('login', () => {
  cy.visit('http://fryda.deizon.com'); //tohle mě přesměruje na tu stránku

  cy.get('#username').type('admin'); //vyplni pole username

  cy.get('#password').type('admin'); //vyplni pole password

  cy.get(
    'body > app-root > div > ng-component > div > div > app-sign-in-form > form > div:nth-child(4) > button'
  ).click(); //spusti se ta funkce kdyz kliknu

  cy.wait(500);
});
