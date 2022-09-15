/// <reference types="cypress" />

describe('saucedemo ecommerce footer', () => {
  context('links', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.validLogin()
    })

    it('connects to twitter page', () => {
      cy.get('.social_twitter>a')
        .click()
    })
  })
})