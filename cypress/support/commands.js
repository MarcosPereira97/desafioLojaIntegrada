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
Cypress.Commands.add('addZip', () => {

    cy.get('#calcularFrete')
        .should('be.visible')
        .type('18087-015')
    cy.get('input[data-code=SEDEX]')
        .should('be.visible')
        .click()
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
Cypress.Commands.add('calcShipping', () => {
    cy.get(':nth-child(2) > .radio > .cor-principal')
        .should('be.visible')
        .invoke('text')
        .then(($value_1) => {
            const valorFrete = parseFloat($value_1.replace('R$', ''))
            cy.get('strong[class*=valor-total]')
                .should('be.visible')
                .invoke('text')
                .then(($value_2) => {
                    const valorTotal = parseFloat($value_2.replace('R$', ''))            
                    const resultado = (valorTotal - valorFrete)

                    cy.get('.total > .titulo')
                        .should('have.text', `R$ ${resultado},00`)
                })
        })
})
Cypress.Commands.add('calcPercentDiscount', () => {
    cy.get('.subtotal > .titulo')
        .should('be.visible')
        .invoke('text')
        .then(($value_1) => {
            const totalCarrinho = parseFloat($value_1.replace('R$', ''))

            cy.get('strong[id=cupom_desconto]')
                .should('be.visible')
                .invoke('text')
                .then(($value_2) => {
                    const valorPorcentagem = parseFloat($value_2.replace(/\s+%/g, ''))
                    const descontoPorcentagem = ((valorPorcentagem / 100) * totalCarrinho)
                    const resultado = (totalCarrinho - descontoPorcentagem)

                    cy.get('.total > .titulo')
                        .should('have.text', `R$ ${resultado},00`)
                })

        })

})
Cypress.Commands.add('calcFixedDiscount', () => {
    cy.get('.subtotal > .titulo')
        .should('be.visible')
        .invoke('text')
        .then(($value_1) => {
            const totalCarrinho = parseFloat($value_1.replace('R$', ''))

            cy.get('strong[id=cupom_desconto]')
                .should('be.visible')
                .invoke('text')
                .then(($value_2) => {
                    const descontoFixo = parseFloat($value_2.replace('R$', ''))
                    const resultado = (totalCarrinho - descontoFixo)

                    cy.get('.total > .titulo')
                        .should('have.text', `R$ ${resultado},00`)
                })

        })

})