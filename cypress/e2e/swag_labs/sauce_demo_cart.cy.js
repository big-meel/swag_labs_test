/// <reference types="cypress" />

describe('saucedemo ecommerce cart', () => {
  context('when login invalid', () => {
    it('displays error', () => {
      cy.visit('/cart.html', {failOnStatusCode: false} )
      
      cy.get('[data-test="error"]')
        .should('have.text', "Epic sadface: You can only access '/cart.html' when you are logged in.")
    })
  })

  context('when login is valid', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.validLogin()
    })

    it('confirms item is added from products page', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click()

      cy.visit('/cart.html', {failOnStatusCode: false})

      cy.get('.inventory_item_name')
        .should('have.text', 'Sauce Labs Backpack')
    })

    it('confirms item is added from item page', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click()

      cy.visit('/cart.html', {failOnStatusCode: false})

      cy.get('.inventory_item_name')
        .should('have.text', 'Sauce Labs Backpack')
    })


    context('when item has been added to cart', () => {
      beforeEach(() => {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click()        
      })

      it('confirms item can be removed from products page', () => {
        cy.get('[data-test="remove-sauce-labs-backpack"]')
          .click()

        cy.visit('/cart.html', {failOnStatusCode: false})

        cy.get('.cart_item')
          .should('not.exist')
      })

      it('confirms item can be removed from item page', () => {
        cy.get('#item_4_title_link').click()

        cy.get('[data-test="remove-sauce-labs-backpack"]')
          .click()

        cy.visit('/cart.html', {failOnStatusCode: false})

        cy.get('.cart_item')
          .should('not.exist')
      })

      it('can remove item from cart page', () => {
        cy.visit('/cart.html', {failOnStatusCode: false})
        
        cy.get('[data-test="remove-sauce-labs-backpack"]')
          .click()

        cy.get('.cart_item')
          .should('not.exist')
      })

      it('can return to products page using continue shopping link', () => {
        cy.visit('/cart.html', {failOnStatusCode: false})

        cy.get('[data-test="continue-shopping"]')
          .click()

        cy.url().should('include', '/inventory.html')
      })

      it('proceeeds to checkout', () => {
        cy.visit('/cart.html', {failOnStatusCode: false})

        cy.get('[data-test="checkout"]')
          .click()

        cy.get('.title')
          .should('have.text', 'Checkout: Your Information')
      })

      context('from checkout step one', () => {
        beforeEach(() => {
          cy.visit('/checkout-step-one.html', {failOnStatusCode: false})
        })

        it('displays error if form left blank', () => {
          cy.get('[data-test="continue"]')
            .click()

          cy.get('[data-test="error"]')
            .should('have.text', 'Error: First Name is required')
        })

        it('returns to cart on cancel', () => {
          cy.get('[data-test="cancel"]')
            .click()

          cy.url().should('include', '/cart.html')
        })

        it('proceeds to next step if information added', () => {
          cy.get('[data-test="firstName"]')
            .type('James')

          cy.get('[data-test="lastName"]')
            .type('Bond')

          cy.get('[data-test="postalCode"]')
            .type('00000')

          cy.get('[data-test="continue"]')
            .click()

          cy.url().should('include', 'checkout-step-two.html')
        })
      })

      context('from checkout step two', () => {
        beforeEach(() => {
          cy.visit('/checkout-step-two.html', {failOnStatusCode: false})
        })

        it('confirms item is added', () => {
          cy.get('.inventory_item_name')
            .should('have.text', 'Sauce Labs Backpack')
        })

        it('returns to product page on cancel', () => {
          cy.get('[data-test="cancel"]')
            .click()

          cy.url().should('include', '/inventory.html')
        })

        it('proceeds to complete when finish is clicked', () => {
          cy.get('[data-test="finish"]')
            .click()

          cy.get('.title')
            .should('have.text', 'Checkout: Complete!')
        })

      })

    })

  })
})