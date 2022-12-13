describe('Left menu', () => {

  beforeEach(() => {
    const [username, password] = [sessionStorage.getItem('username') || undefined, sessionStorage.getItem('password') || undefined];
    cy.login(username, password);
  });

  it('menu contains: Dashboard, Request, Proposals, Settings, Log Out items ', () => {
    const menuTitles = [
      'Dashboard',
      'Requests',
      'Proposals',
      'Settings',
      'Log Out'
    ];

    cy.get('[data-cy=menu-item]').as('menuItems');

    cy.get('@menuItems')
      .should('have.length', menuTitles.length)
      .then($elements => Cypress.$.makeArray($elements).map(el => el.innerText))
      .should('deep.equal', menuTitles);
  });

  it('renders service logo correctly', () => {
    cy.get('[data-cy=logo-app]')
      .should('have.attr', 'routerLink', '/')
      .children('img')
      .should('have.attr', 'alt', 'logo');
  });

  it('log outs from the application after click on the "Log Out" button', () => {
    cy.get('[data-cy=menu-item]')
      .last()
      .should('contain.text', 'Log Out')
      .click();

    cy.url().should('contain', 'auth/sign-in');
  });

  it('displays user information and redirect to the user profile after click', () => {
    cy.get('[data-cy=user-profile]')
      .should('have.attr', 'routerLink', '/profile')
      .click();

    cy.url().should('contain', 'profile/view');
  });
})
