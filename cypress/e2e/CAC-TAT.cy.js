/// <reference types="Cypress" />

//const { functionsIn } = require("cypress/types/lodash")

// Descrição é o nome do projeto ou testes
// it é o testes que vai ser executado
// Para abrir o Cypress digite no terminal: npx cypress open


describe('Central de Atendimento ao Cliente TAT', function() {
   beforeEach(function() {
        cy.visit('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')

   })    

    it ('Preencha os campos obriatorios e envie o formulario', function() {
        // .type(longText, { delay: 0 } = faz com que a digitação do texto seja rapida
        // deve criar a tag const longText = 'exemplo'
        const longText = 'Testes, Teste, Teste, Teste Testes, Teste, Teste, Teste Testes, Teste, Teste, Teste Testes, Teste, Teste, TesteTestes, Teste, Teste, Teste Testes, Teste, Teste, Teste Testes, Teste, Teste, Teste Testes, Teste, Teste, Teste'
        cy.get('#firstName').type('Tobias')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('tobiasg@exemplo.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })

    it ('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('Tobias')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('tobiasg!exemplo.com$#@')
        cy.get('#open-text-area').type('Testes, Teste, Teste, Teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it ('Campo telefone so exibe numero e não alfabeto', function () {

        cy.get('#phone')
        .type('abcdefghi')
        .should('have.value', '')
    })
    it ('Ao selecionar telefone e não preencher deve retornar erro', function () {
        cy.get('#firstName').type('Tobias')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('tobiasg@exemplo.com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('Testes, Teste, Teste, Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it ('Preencher e limpar os campos nome, sobre nome, e-mail, telefone e texto', function () {
        const longText = 'Testes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, Teste'
        cy.get('#firstName')
            .type('Tobias')
            .should('have.value', 'Tobias')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Gomes')
            .should('have.value', 'Gomes')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('tobiasg@exemplo.com')
            .should('have.value', 'tobiasg@exemplo.com')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area')
            .type(longText, { delay: 5 })
            .should('have.value', 'Testes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, TesteTestes, Teste, Teste, Teste')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12345678925')
            .should('have.value', '12345678925')
            .clear()
            .should('have.value', '')
        })

    it ('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        })

    it ('seleciona um produto (YouTube) por seu texto', function ()  {
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it.only ('Selecionar produto pelo valor', function () {
        cy.get('#product')
        .select(2)
        .should('have.value', 'blog')

    })

    it ('Marcar tipo de atendimento Feedback', function () {
        cy.get ('input[type="radio"][value="feedback"]')
        .check ()
        .should ('have.value', 'feedback')
    })
    it ('Marcar cada tipo de atendimento', function () {
        cy.get ('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio){
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
     })
             
    it ('marcar cada tipo de chekbox e desmarcar o ultimo', function () {
        cy.get('input[type="checkbox"]')
        .check()
        .should('be.checked')
        .last()
        .uncheck()
        .should('not.be.checked')
    })
    it ('validar que ao marcar o telefone seja obrigatorio o preenchimento do telefone', function () {
        cy.get('#firstName').type('Tobias')
        cy.get('#lastName').type('Gomes')
        cy.get('#email').type('tobiasg@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Testes, Teste, Teste, Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it ('Validar selecionando um arquivo', function () {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            console.log($input)
            expect($input [0].files[0].name).to.equal('example.json')
        })
    })

    it ('Selecionando um arquivo simultaneio drag-drop', function () {
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            console.log($input)
            expect($input [0].files[0].name).to.equal('example.json')
        })
    })

    it ('Selecionando um arquivo utilizando uma fixture na qual foi dado um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile ('@sampleFile')
        .should(function($input) {
            console.log($input)
            expect($input [0].files[0].name).to.equal('example.json')
        })
    })

    it ('Validar que ao clicar em privacidade abre em outra aba sem a necessidade de clicar', function () {
        cy.get('#privacy a')
        .should('have.attr', 'target', '_blank')
    })

    it ('Validar que ao clicar em privacidade abre na mesma pagina "removendo o target"', function () {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

  })
  