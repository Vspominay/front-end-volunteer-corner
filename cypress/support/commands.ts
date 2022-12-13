import { IWindowCypress } from '../../src/app/interfaces/window-cypress.interface';

Cypress.Commands.add('dispatch', (action) => {
  cy.window().then((window) => {
    (window as unknown as IWindowCypress).store.dispatch(action);
  });
});

Cypress.Commands.add('login', (username: string = 'h_username', password: string = 'hhhhhhhhH6@') => {
  cy.session([username, password], () => {
    cy.visit('/auth/sign-in');
    cy.get('app-input').first().type(username);
    cy.get('app-input').last().type(password);
    cy.get('app-button').click();
    cy.url().should('contain', 'dashboard');
  });
  cy.visit('/dashboard')
});

declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      dispatch(action: any): Chainable<null>;

      login(username?: string, password?: string): Chainable<null>;
    }
  }
}


