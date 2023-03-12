/// <reference types="cypress" />

describe('Desafio Loja Integrada', () => {

    let listaCupom

    beforeEach(() => {
        cy.visit('/')

        cy.fixture('cupons')
            .then(c => {
                listaCupom = c
            })
        cy.title()
            .should('be.eq', 'QA Store Desafio')
    })

    context('Validar Cupons', () => {
        it('deve validar cupom FRETEGRATIS', () => {
            const cupons = listaCupom.cupom

            cy.accesingProduct()
            cy.addingProductToCart()
            cy.addZip()
            cy.addCoupon(cupons.fretegratis)
            cy.validateCouponDescount('Frete Grátis')
            cy.calcShipping()
            
        })
        it('deve validar cupom 10off', () => {
            const cupons = listaCupom.cupom

            cy.accesingProduct()
            cy.addingProductToCart()
            cy.addCoupon(cupons.dezoff)
            cy.calcPercentDiscount()
            cy.validateCouponDescount('Desconto: 10 %')
        })
        it('deve validar cupom 30REAIS', () => {    
            const cupons = listaCupom.cupom

            cy.accesingProduct()
            cy.addingProductToCart()
            cy.addCoupon(cupons.trintareais)
            cy.calcFixedDiscount()
            cy.validateCouponDescount('Desconto: R$ 30,00')
        })
        it('deve validar cupom 20LIMITADO', () => {
            const cupons = listaCupom.cupom

            cy.accesingProduct()
            cy.addingProductToCart()
            cy.addCoupon(cupons.vintelimitado)
            cy.validateCouponAlert('Cupom não encontrado.')
        })
        it('deve validar cupom AJJFLWBHH', () => {
            const cupons = listaCupom.cupom

            cy.accesingProduct()
            cy.addingProductToCart()
            cy.addCoupon(cupons.ajjflwbhh)
            cy.calcPercentDiscount()
            cy.validateCouponDescount('Desconto: 5 %')
        })
        it('deve validar cupom CUPOMVENCIDO', () => {
            const cupons = listaCupom.cupom

            cy.accesingProduct()
            cy.addingProductToCart()
            cy.addCoupon(cupons.cupomvencido)
            cy.validateCouponAlert('O cupom não é válido.')
        })
    })
})