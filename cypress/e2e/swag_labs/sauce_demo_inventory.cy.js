/// <reference types="cypress" />

describe('saucedemo ecommerce inventory', () => {
  context('when login invalid', () => {
    it('displays error', () => {
      cy.visit('/inventory.html', {failOnStatusCode: false} )
      
      cy.get('[data-test="error"]')
        .should('have.text', "Epic sadface: You can only access '/inventory.html' when you are logged in.")
    })
  })

  context('when login is valid', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.validLogin()
      cy.visit('/inventory.html', {failOnStatusCode: false})
    })

    it('navigates to inventory page', () => {
      cy.get('.title')
        .should('have.text', "Products")
    })

    it('access an inventory item', () => {
      cy.get('#item_4_title_link')
        .click()

      cy.get('#inventory_item_container')
        .within(() => {
          cy.get('.inventory_details_img_container').find('img')
          cy.get('.inventory_details_desc_container').within(() => {
            cy.get('.inventory_details_name').should('be.visible')
            cy.get('.inventory_details_price').should('be.visible')
          })
        })
    })

  })

})