/// <reference types="cypress" />

describe('saucedemo ecommerce cart', () => {
  context('when login invalid', () => {
    it('displays error', () => {
      cy.visit('/cart.html', {failOnStatusCode: false} )
      
      cy.get('[data-test="error"]')
        .should('have.text', "Epic sadface: You can only access '/cart.html' when you are logged in.")
    })
  })

  // context('when login is valid', () => {
  //   beforeEach()
  // })
})