/// <reference types="cypress" />

Cypress.Commands.add('accesingProduct', () => {
    cy.get('.listagem-linha .listagem-item')
        .first()
        .click()
})
Cypress.Commands.add('addingProductToCart', () => {
    cy.contains('a', 'Comprar')
        .click()
    cy.get('h1:contains(Carrinho)')
        .should('be.visible')
})
Cypress.Commands.add('addCoupon', (cupons) => {
    cy.get('#usarCupom')
        .should('be.visible')
        .type(cupons)
    cy.get('#btn-cupom')
        .click()
})
Cypress.Commands.add('validateCouponAlert', (txt) => {
    cy.get('div[class*=alert-danger]')
        .contains(txt)
        .should('be.visible')
})
Cypress.Commands.add('validateCouponDescount', (txt) => {
    cy.get('.cupom-valor')
        .contains(txt)
        .should('be.visible')
})