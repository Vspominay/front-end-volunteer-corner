describe('Authentication', () => {

  beforeEach(() => {
    cy.visit('auth/sign-in')
  });

  it('displays inputs for Sign in', () => {
    cy.get('app-input').should('have.length', 2);
  });

  it('title should contains Sign in information', () => {
    cy.contains('Sign In');
  });

  it('page contains the project logo', () => {
    cy.get('img')
      .first()
      .should('have.attr', 'alt', 'Volunteer corner logo');
  });

  it('displays error about invalid username or password', () => {
    const authUser = {
      username: 'h_username',
      password: 'hhhhhhhhH2@'
    }

    cy.get('app-input').first().type(authUser.username);
    cy.get('app-input').last().type(authUser.password);
    cy.get('app-button').click();

    cy.get('mat-error').contains('Invalid Authentication');
  });

  it('successfully Sign In user', () => {
    const authUser = {
      username: 'h_username',
      password: 'hhhhhhhhH6@'
    }

    cy.get('app-input').first().type(authUser.username);
    cy.get('app-input').last().type(authUser.password);
    cy.get('app-button').click().then(() => {
      cy.location().should(location => {
        expect(location.pathname).to.eq('/dashboard')
        expect(JSON.parse(localStorage.getItem('auth') || '').userName).to.eq(authUser.username)
      });
    });
  });
})
