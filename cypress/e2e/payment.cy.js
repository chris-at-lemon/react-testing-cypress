const { equal } = require('assert');
const {v4: uuidv4} = require('uuid')

describe('payment', () => {
  it('user can make a payment', () => {
    
    // login
    cy.visit('/');
    cy.findByRole('textbox', {name: /username/i}).type('johndoe');
    cy.findByLabelText(/password/i).type('s3cret');
    cy.findByRole('checkbox', {name: /remember me/i}).check();
    cy.findByRole('button', {name: /sign in/i}).click();

    // check account balance
    let oldBalance;
    cy.get('[data-test="sidenav-user-balance"]').then(currentBalance => oldBalance = currentBalance.text());

    //click on new button
    cy.findByRole('button', { name: /new/i }).click();

    // search for user
    cy.findByRole('textbox').type('devon becker');
    cy.findByText(/devon becker/i).click();

    // add amount, add note and click pay
    const amountPaid = '5.00';
    cy.findByPlaceholderText(/amount/i).type(amountPaid);
    const note = uuidv4()
    cy.findByPlaceholderText(/add a note/i).type(note);

    cy.findByRole('button', { name: /pay/i }).click();

    // return to transactions
    cy.findByRole('button', { name: /return to transactions/i }).click();

    // go to personal payments
    cy.findByText(/mine/i).click();

    // go to payment 
    cy.findByText(note).click({force: true});

    // verify Payment was made
    cy.findByText(`-$${amountPaid}`).should('be.visible');
    cy.findByText(note).should('be.visible');

    // verify account balance
    cy.get('[data-test="sidenav-user-balance"]').then(balance => {
      const parsedOldBalance = parseFloat(oldBalance.replace(/\$|,/g, ''));
      const parsedNewBalance = parseFloat(balance.text().replace(/\$|,/g, ''));
      console.log(parsedOldBalance);

      expect(parsedOldBalance - parsedNewBalance).to.equal(parseFloat(amountPaid));
    });

  })
})