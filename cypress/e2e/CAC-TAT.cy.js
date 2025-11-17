describe('Central de Atendimento ao Cliente TAT', () => {

  // Executa antes de cada teste
  beforeEach(() => {
    cy.visit('./src/index.html') // caminho absoluto
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    // Preenchendo os campos obrigatórios
    const longText = Cypress._.repeat('Este é um texto muito longo para testar a digitação rápida no campo.', 10)

    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Teixeira')
    cy.get('#email').type('anateixeira.tester@gmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button', 'Enviar').click()

    // Verificando se a mensagem de sucesso aparece
    cy.get('.success').should('be.visible')

  })

  it('exibe mensagem de erro ao submeter email inválido', () => {
  cy.get('#firstName').type('Ana')
  cy.get('#lastName').type('Teixeira')
  cy.get('#email').type('anateixeira.tester@@gmail.com') // email inválido
  cy.get('#open-text-area').type('Teste de feedback')
  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
  })
  
it('valida que telefone não aceita letras', () => {
  cy.get('#phone')
    .type('abcde')
    .should('have.value', '') // deve continuar vazio
})

it('exibe erro quando telefone obrigatório não é preenchido', () => {
  cy.get('#firstName').type('Ana')
  cy.get('#lastName').type('Teixeira')
  cy.get('#email').type('anateixeira.tester@gmail.com')
  cy.get('#open-text-area').type('Teste de feedback')
  cy.get('#phone-checkbox').click ()
  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})

it('preenche e limpa campos nome, sobrenome, email e telefone', () => {
  cy.get('#firstName')
    .type('Ana')
    .should('have.value', 'Ana')
    .clear()
    .should('have.value', '')

  cy.get('#lastName')
    .type('Teixeira')
    .should('have.value', 'Teixeira')
    .clear()
    .should('have.value', '')

  cy.get('#email')
    .type('anateixeira.tester@gmail.com')
    .should('have.value', 'anateixeira.tester@gmail.com')
    .clear()
    .should('have.value', '')

  cy.get('#phone')
    .type('123456789')
    .should('have.value', '123456789')
    .clear()
    .should('have.value', '')
})

it('exibe erro ao submeter formulário vazio', () => {
  cy.contains('button', 'Enviar').click()

  cy.get('.error').should('be.visible')
})

it('envia o formulário com sucesso usando comando customizado', () => {
  cy.fillMandatoryFieldsAndSubmit()
  
  cy.get('.success').should('be.visible')
})


})

