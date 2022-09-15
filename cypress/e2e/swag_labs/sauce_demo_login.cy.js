/// <reference types="cypress" />

describe('saucedemo ecommerce login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
  })

  it('displays error when credentials are blank', () => {
    // See: cypress/support/commands.js
    cy.clickLoginError('Epic sadface: Username is required')
  })

  it('displays error when password is blank', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')

    cy.clickLoginError('Epic sadface: Password is required')
  })

  it('displays error when username is blank and password is entered', () => {
    cy.get('[data-test="password"]')
      .type('secret_sauce')

    cy.clickLoginError('Epic sadface: Username is required')
  })

  it('displays error when username is incorrect', () => {
    cy.get('[data-test="username"]')
      .type('incorrect_user')

    cy.get('[data-test="password"]')
      .type('secret_sauce')

    cy.clickLoginError('Epic sadface: Username and password do not match any user in this service')
  })

  it('displays error when username is correct and password blank', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')

    cy.get('[data-test="password"]')
      .type('incorrect_sauce')

    cy.clickLoginError('Epic sadface: Username and password do not match any user in this service')
  })

  it('displays error if both username and password are incorrect', () => {
    cy.get('[data-test="username"]')
      .type('incorrect_user')

    cy.get('[data-test="password"]')
      .type('incorrect_password')

    cy.clickLoginError('Epic sadface: Username and password do not match any user in this service')
  })

  it('should login to products page when credentials are correct', () => {
    cy.get('[data-test="username"]')
      .type('standard_user')

    cy.get('[data-test="password"]')
      .type('secret_sauce')

    cy.clickLogin()

    cy.get('.title')
      .should('have.text', "Products")
  })

  it('displays error if user is locked out', () => {
    cy.get('[data-test="username"]')
      .type('locked_out_user')

    cy.get('[data-test="password"]')
      .type('secret_sauce')

    cy.clickLoginError('Epic sadface: Sorry, this user has been locked out.')
  })


})





// Decide whether to split code into contexts by files, login.cy.js, inventory.cy.js etc
// OR
// Have one large test file