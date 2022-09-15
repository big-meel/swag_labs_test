/// <reference types="cypress" />

describe('saucedemo ecommerce logout', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com')
    cy.validLogin()
  })

  it('log out from inventory page', () => {
    cy.get('.title')
      .should('have.text', "Products")

    cy.get('#react-burger-menu-btn')
      .click()

    cy.get('#logout_sidebar_link')
      .click()

    cy.get('#login_button_container')
  })
})