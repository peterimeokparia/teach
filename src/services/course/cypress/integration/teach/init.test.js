import axios from 'axios';

const userName = "peter.imeokparia@gmail.com";
const PREFIX = "http://localhost:9005/api/v1";
let userId = undefined;
const firstName = "TeachUser001";

before('uno', async () => {
  findExistingUserThenDelete();
});

before('one', () => {
  try {
      cy.visit('/login');

      cy.get('[data-cy=signup]')
      .should('have.attr', 'data-cy', 'signup');
    
      cy.get('[data-cy=email]')
      .should('have.attr', 'placeholder', 'email')
      
      cy.get('[data-cy=signup]').click();
    
      cy.get('[data-cy=email]')
      .type(userName)
        .should('have.value', userName);
    
      cy.get('[data-cy=signup]').click();
    
      cy.get('[data-cy=email]')
      .type(userName)
        .should('have.value', userName);
      
      cy.get('[data-cy=submit]').click();
    
      cy.get('[data-cy=password]')
        .type(userName)
          .should('have.value', userName);
    
      cy.get('[data-cy=firstName]')
        .type(firstName)
          .should('have.value', firstName);
    
      cy.get('[data-cy=radio-Tutor]').click();
      cy.get('[data-cy=submit]').click();

      cy.visit('/login');

  } catch (error) {
    console.log( error );
  }
});

before('update user', async () => {
    try {
      let response = await axios.get(`${PREFIX}/users/user/byEmail?email=${JSON.stringify({email: userName })}`);

      if (  response?.data[0]?._id  ){
  
          let { _id } = response?.data[0];
  
          let updatedUser = await axios.put(`${PREFIX}/users/${_id}`, { ...response?.data, userIsValidated: true, userIsVerified: true});
      }
    } catch (error) {
      console.log( error );
    }
});

before('logs in user', () => {

   cy.visit('/login');

   cy.get('[data-cy=email]')
    .should('have.attr', 'placeholder', 'email')

   cy.get('[data-cy=email]')
   .type(userName)
     .should('have.value', userName);
 
   cy.get('[data-cy=password]')
   .type(userName)
     .should('have.value', userName);    
     
   cy.get('[data-cy=submit-login]').click();
 });

describe('teach', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false;
  });

  it('gets a selected tutor', () => {
    cy.get('[data-cy=multicolortext_peter]').click();
    cy.get('[data-cy=header]').children().should('have.attr', 'data-cy', 'h1');
  });

  it('gets a list of courses for the selected tutor', () => {
    cy.visit('/users');
    cy.get('[data-cy=peter_SchoolIcon]').click();
    cy.get('[data-cy=courses]').children().should('have.attr', 'data-cy', 'courses_link');
    cy.get('[data-cy=courses_link]').click();
    cy.get('[data-cy=new-course-btn]').should('contain', 'Add New Course');
  });

  it('gets the tutors class room', () => {
    cy.visit('/users');
    cy.get('[data-cy=peter_BookIcon]').click();
    // cy.get('[data-cy=courses]').children().should('have.attr', 'data-cy', 'courses_link');
    // cy.get('[data-cy=courses_link]').click();
    // cy.get('[data-cy=new-course-btn]').should('contain', 'Add New Course');
  });

  it('gets the tutors session calendar', () => {
    cy.visit('/users');
    cy.get('[data-cy=peter_ScheduleIcon]').click();
    cy.get('[data-cy=peter_ScheduleIcon]').click();
    // cy.get('[data-cy=peter_ScheduleIcon]').click();
    // cy.get('[data-cy=courses]').children().should('have.attr', 'data-cy', 'courses_link');
    // cy.get('[data-cy=courses_link]').click();
    // cy.get('[data-cy=new-course-btn]').should('contain', 'Add New Course');
  });

  // it('gets the tutors scheduling calendar', () => {
  //   cy.visit('/users');
  //   cy.get('[data-cy=peter_ScheduleIcon]').click();
  //   // cy.get('[data-cy=courses]').children().should('have.attr', 'data-cy', 'courses_link');
  //   // cy.get('[data-cy=courses_link]').click();
  //   // cy.get('[data-cy=new-course-btn]').should('contain', 'Add New Course');
  // });

  it('gets the tutors consultation calendar', () => {
    cy.visit('/users');
    cy.get('[data-cy=peter_CalendarTodayIcon]').click();
    cy.get('[data-cy=peter_CalendarTodayIcon]').click();
    // cy.get('[data-cy=courses]').children().should('have.attr', 'data-cy', 'courses_link');
    // cy.get('[data-cy=courses_link]').click();
    // cy.get('[data-cy=new-course-btn]').should('contain', 'Add New Course');
  });

  it('gets the tutors meeting plan', () => {
    cy.visit('/users');
    cy.get('[data-cy=peter_TimelineIcon]').click();

    // cy.get('[data-cy=courses]').children().should('have.attr', 'data-cy', 'courses_link');
    // cy.get('[data-cy=courses_link]').click();
    // cy.get('[data-cy=new-course-btn]').should('contain', 'Add New Course');
  });

});


after('', async ()=>{
  findExistingUserThenDelete();
})

async function findExistingUserThenDelete(){
  try {
    let response = await axios.get(`${PREFIX}/users/user/byEmail?email=${JSON.stringify({email: userName, password: userName })}`);

    if ( response?.data[0]?._id ) {

      let { _id, token } = response?.data[0];

      if ( _id && token ) {
        let deleteObjectResponse = await axios.delete(`${PREFIX}/users/${ _id }`,{ headers: {"Authorization": `Bearer ${token}`} });
      }
    }
  } catch (error) {
    console.log( error );
  }
}




