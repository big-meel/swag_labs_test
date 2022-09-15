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

  context('from the products page', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.validLogin()
    })

    it('can add an item to the cart', () => {
      cy.get('#add-to-cart-sauce-labs-backpack').click()

      cy.get('.shopping_cart_link')
        .contains('span', '1')
    })

    it('can add multiple items to cart', () => {
      cy.get('#add-to-cart-sauce-labs-backpack').click()
      cy.get('#add-to-cart-sauce-labs-bike-light').click()

      cy.get('.shopping_cart_link')
        .contains('span', '2')
    })

    it('can remove items from cart', () => {
      cy.get('#add-to-cart-sauce-labs-backpack').click()
      cy.get('[data-test="remove-sauce-labs-backpack"]').click()

      cy.get('.shopping_cart_link')
        .contains('span')
        .should('not.exist')
    })

    it('can sort alphabetically from A to Z', () => {
      cy.get('[data-test="product_sort_container"]')
        .select('Name (A to Z)')
        .should('have.value', 'az')

      cy.get('.inventory_list > :nth-child(1)')
        .find('.inventory_item_name')
        .should('have.text', 'Sauce Labs Backpack')
    })

    it('can sort alphabetically from Z to A', () => {
      cy.get('[data-test="product_sort_container"]')
        .select('za')

      cy.get('.inventory_list > :nth-child(1)')
        .find('.inventory_item_name')
        .should('have.text', "Test.allTheThings() T-Shirt (Red)")
    })

    it('can sort by price from High to Low', () => {
      cy.get('[data-test="product_sort_container"]')
        .select('hilo')

      cy.get('.inventory_list > :nth-child(1)')
        .find('.inventory_item_name')
        .should('have.text', "Sauce Labs Fleece Jacket")
    })

    it('can sort by price from Low to High', () => {
      cy.get('[data-test="product_sort_container"]')
        .select('lohi')

      cy.get('.inventory_list > :nth-child(1)')
        .find('.inventory_item_name')
        .should('have.text', "Sauce Labs Onesie")
    })
  }) 

  context('from an item page', () => {
    beforeEach(() => {
      cy.visit('/')
      cy.validLogin()
      cy.get('#item_4_title_link').click()
    })

    it('can add item to cart', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()

      cy.get('.shopping_cart_link')
        .contains('span', '1')
    })

    it('can remove item from cart', () => {
      cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
        .click()

      cy.get('.shopping_cart_link')
        .contains('span', '1')

      cy.get('[data-test="remove-sauce-labs-backpack"]').click()

      cy.get('.shopping_cart_link')
        .contains('span')
        .should('not.exist')
    })

    it('returns to products page with button', () => {
      cy.get('[data-test="back-to-products"]')
        .click()

      cy.get('.title')
        .should('have.text', "Products") 
    })
  })

})