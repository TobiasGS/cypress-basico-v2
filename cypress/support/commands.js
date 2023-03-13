Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function () {
    
    cy.get('#firstName').type('Tobias')
    cy.get('#lastName').type('Gomes')
    cy.get('#email').type('tobiasg@exemplo.com')
    cy.get('#open-text-area').type('testes, teste, testes, teste')
    cy.get('button[type="submit"]').click()
})
