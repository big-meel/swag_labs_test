/// <reference types="cypress" />

describe('saucedemo ecommerce footer', () => {
  context('links', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.validLogin()
    })


    it('connects to twitter page', () => {
    
      cy.get('.social_twitter>a').should($a => {
        expect($a.attr('href'), 'href').to.equal('https://twitter.com/saucelabs')
        $a.attr('target', '_self')
      }).click()

      cy.location('pathname').should('include', '/saucelabs')
    })


    it('connects to facebook page', () => {
    
      cy.get('.social_facebook>a').should($a => {
        expect($a.attr('href'), 'href').to.equal('https://www.facebook.com/saucelabs')
        $a.attr('target', '_self')
      }).click()

      cy.location('pathname').should('include', '/saucelabs')
    })


    it('connects to facebook page', () => {
    
      cy.get('.social_linkedin>a').should($a => {
        expect($a.attr('href'), 'href').to.equal('https://www.linkedin.com/company/sauce-labs/')
        $a.attr('target', '_self')
      }).click()

      cy.location('pathname').should('include', '/sauce-labs')
    })

  })
})