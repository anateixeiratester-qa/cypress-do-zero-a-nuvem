describe('Central de Atendimento ao Cliente TAT', () => {

  // Executa antes de cada teste - garante que cada teste comece com a aplicação limpa
  beforeEach(() => {
    cy.visit('./src/index.html') // caminho absoluto
  })

  // Teste para verificar se o título da página está correto
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  // Teste de fluxo positivo - preenchimento completo do formulário com texto longo
  it('preenche os campos obrigatórios e envia o formulário', () => {
    // Preenchendo os campos obrigatórios
    const longText = Cypress._.repeat('Este é um texto muito longo para testar a digitação rápida no campo.', 10)

    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Teixeira')
    cy.get('#email').type('anateixeira.tester@gmail.com')
    cy.get('#open-text-area').type(longText, { delay: 0 }) // delay 0 para teste rápido
    cy.contains('button', 'Enviar').click()

    // Verificando se a mensagem de sucesso aparece
    cy.get('.success').should('be.visible')

  })

  // Teste de validação de email - verifica comportamento com email inválido
  it('exibe mensagem de erro ao submeter email inválido', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Teixeira')
    cy.get('#email').type('anateixeira.tester@@gmail.com') // email inválido
    cy.get('#open-text-area').type('Teste de feedback')
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Teste de máscara/mvalidação do campo telefone - não deve aceitar caracteres não numéricos
  it('valida que telefone não aceita letras', () => {
    cy.get('#phone')
      .type('abcde')
      .should('have.value', '') // deve continuar vazio
  })

  // Teste de campo obrigatório - telefone se torna obrigatório quando o checkbox é marcado
  it('exibe erro quando telefone obrigatório não é preenchido', () => {
    cy.get('#firstName').type('Ana')
    cy.get('#lastName').type('Teixeira')
    cy.get('#email').type('anateixeira.tester@gmail.com')
    cy.get('#open-text-area').type('Teste de feedback')
    cy.get('#phone-checkbox').click() // marca checkbox que torna telefone obrigatório
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Teste de funcionalidade dos campos - preencher e limpar para verificar comportamento
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

  // Teste de validação de formulário vazio - todos os campos obrigatórios em branco
  it('exibe erro ao submeter formulário vazio', () => {
    cy.contains('button', 'Enviar').click()

    cy.get('.error').should('be.visible')
  })

  // Teste usando comando customizado - demonstra reutilização de código
  it('envia o formulário com sucesso usando comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success').should('be.visible')
  })

  // Testes de seleção suspensa - três formas diferentes de selecionar opções

  // Seleção por texto visível
  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube') // Seleciona pelo texto visível
      .should('have.value', 'youtube') // Verifica o valor selecionado
  })

  // Seleção por valor (atributo value)
  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria') // Seleciona pelo valor (value) do option
      .should('have.value', 'mentoria') // Verifica se o valor foi definido corretamente
  })

  // Seleção por índice numérico
  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product')
      .select(1) // Seleciona pelo índice (começa em 0)
      .should('have.value', 'blog') // Verifica o valor selecionado
  })

  // Seleção de tipo de atendimento
  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]') // Marca botão "Feedback"
      .check()
      .should('be.checked')
  })

  // Array com todos os valores dos tipos de atendimento
  it('marca cada tipo de atendimento', () => {
    const tiposAtendimento = ['ajuda', 'elogio', 'feedback']

    // Para cada tipo de atendimento, marca e verifica
    tiposAtendimento.forEach(tipo => {
      cy.get(`input[type="radio"][value="${tipo}"]`) // Seleciona cada radio button
        .check()
        .should('be.checked') // Verifica se está marcado
    })
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]') // Primeiro obtém todos os radio buttons
      .each(typeOfService => {
        cy.wrap(typeOfService) // Usa cy.wrap() para converter o elemento jQuery em objeto Cypress
          .check() // Marca o radio button
          .should('be.checked') // Verifica se está marcado
      })
  })
})