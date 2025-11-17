Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Andreia',
    lastName: 'Teixeira',
    email: 'andreia@gmail.com',
    text: 'Teste exercíco extra 7.3',
})=> {
 cy.get('#firstName').type(data.firstName)
  cy.get('#lastName').type(data.lastName)
  cy.get('#email').type(data.email)
  cy.get('#open-text-area').type(data.text)
  cy.contains('button', 'Enviar').click()
})
