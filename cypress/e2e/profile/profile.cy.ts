describe('Profile', () => {

  beforeEach(() => {
    const [username, password] = [sessionStorage.getItem('username') || undefined, sessionStorage.getItem('password') || undefined];
    cy.login(username, password);
    cy.visit('/profile');
  });

  it('renders page title: "Profile"', () => {
    cy.contains('Profile');
  });

  describe('edit page', () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: '**/Users/profile'
        },
        {
          firstName: 'John',
          lastName: 'Doe',
          helpSeeker: {
            phone: '+3805475551',
            email: 'john_doe@gmail.com'
          }
        }).as('getProfile');

      cy.visit('/profile/edit');
    });

    it('displays inputs for updating personal information', function () {
      cy.get('app-input')
        .should('have.length', 4);
    });

    it('renders expected input with values', () => {
      cy.wait('@getProfile');

      cy.get('app-input[formControlName="firstName"] input').should('have.value', 'John')
      cy.get('app-input[formControlName="lastName"] input').should('have.value', 'Doe')
      cy.get('app-input[formControlName="phoneNumber"] input').should('have.value', '+3805475551')
      cy.get('app-input[formControlName="email"] input').should('have.value', 'john_doe@gmail.com')
    });

    it('updates personal user information ', () => {

      cy.get('app-input[formControlName="firstName"] input').clear().type('Jane');
      cy.get('app-input[formControlName="lastName"] input').clear().type('Duk');
      cy.get('app-input[formControlName="phoneNumber"] input').clear().type('+380504562115');
      cy.get('app-input[formControlName="email"] input').clear().type('jane_duk@gmail.com');

      cy.get('app-button')
        .should('contain', 'Confirm')
        .click();

      cy.wait(1000);

      cy.get('[data-cy=firstName]').should('contain', 'Jane');
      cy.get('[data-cy=lastName]').should('contain', 'Duk');
      cy.get('[data-cy=phone]').should('contain', '+380504562115');
      cy.get('[data-cy=email]').should('contain', 'jane_duk@gmail.com');
    });
  });

  describe('view page', () => {
    it('displays first name, last name, email and phone number fields', () => {
      cy.get('app-information-field')
        .should('have.length', 4);
    });

    it('renders expected data in the info data fields', () => {

      cy.intercept(
        {
          method: 'GET',
          url: '**/Users/profile'
        },
        {
          firstName: 'John',
          lastName: 'Doe',
          helpSeeker: {
            phone: '+3805475551',
            email: 'john_doe@gmail.com'
          }
        }).as('getProfile');

      cy.visit('profile/view');

      cy.wait('@getProfile');

      cy.get('[data-cy=firstName]')
        .should('contain', 'John')
        .should('contain', 'First Name');

      cy.get('[data-cy=lastName]')
        .should('contain', 'Doe')
        .should('contain', 'Surname');

      cy.get('[data-cy=phone]')
        .should('contain', '+3805475551')
        .should('contain', 'Phone number');

      cy.get('[data-cy=email]')
        .should('contain', 'john_doe@gmail.com')
        .should('contain', 'Email');
    });

    it('renders button for switch to edit profile view', () => {
      cy.get('[data-cy=edit-profile-btn]')
        .should('contain.text', 'Edit profile')
        .click();

      cy.url().should('contain', '/profile/edit');
      cy.get('app-input')
        .should('have.length', 4);
    });
  });
})
