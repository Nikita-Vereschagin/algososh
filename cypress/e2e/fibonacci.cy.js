import { appData } from "../tools/app-data";

describe('"Последовательность Фибоначчи" работает.', function () {
  beforeEach(() => {
    cy.visit(appData.fibonacci);
    cy.contains("Последовательность Фибоначчи");
    cy.get('[class^=input_input__]').first().as('input');
    cy.contains('Рассчитать').first().as('button');
  });
  it('Кнопка отключена при пустом инпуте', function () {
    cy.get('@input').should('be.empty').get('@button').should('be.disabled');
  });
  it('Число рассчитывается корректно', function () {
    const res = '1123';
    cy.get('@input').should('be.empty').type('3');
    cy.get('@button').click();
    cy.wait(1000);
    cy.get('[class^=circle_circle__]').each((el, i) => {
      cy.get(el)
        .contains(res[i])
    });
  })
});