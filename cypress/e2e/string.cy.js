import { appData } from "../tools/app-data";
import { cypressState } from "../tools/cypress-constants";

describe('"Cтрока" работает.', function () {
  beforeEach(() => {
    cy.visit(appData.url);
    cy.get('[data-test="recursion"]').click();
    cy.contains("Строка");
    cy.get('[class^=input_input__]').first().as('input');
    cy.contains('Развернуть').first().as('button');
  });
  it('Кнопка отключена при пустом инпуте', function () {
    cy.get('@input').should('be.empty').get('@button').should('be.disabled');
  });
  it('Разворот строки работает корректно', function () {
    const step1 = ['ABCD', [cypressState.changing, cypressState.default, cypressState.default, cypressState.changing]]
    const step2 = ['DBCA', [cypressState.modified, cypressState.changing, cypressState.changing, cypressState.modified]]
    const step3 = ['DCBA', [cypressState.modified, cypressState.modified, cypressState.modified, cypressState.modified]]
    cy.get('@input').should('be.empty').type(step1[0]);
    cy.get('@button').click();
    cy.get('[class^=circle_circle__]').each((el, i) => {
      cy.get(el)
        .should("have.css", "border-color", step1[1][i])
        .contains(step1[0][i])
    });
    cy.get('[class^=circle_circle__]').each((el, i) => {
      cy.get(el)
        .should("have.css", "border-color", step2[1][i])
        .contains(step2[0][i])
    });
    cy.get('[class^=circle_circle__]').each((el, i) => {
      cy.get(el)
        .should("have.css", "border-color", step3[1][i])
        .contains(step3[0][i])
    });
  })
});