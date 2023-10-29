import { cypressState, cypressClassName } from "../tools/cypress-constants";
import { appData } from "../tools/app-data";

const {defaultState, changingState, modifiedState} = cypressState
const {input, circle} = cypressClassName

describe('"Cтрока" работает.', function () {
  beforeEach(() => {
    cy.visit(appData.string);
    cy.contains("Строка");
    cy.get(`[${input}]`).first().as('input');
    cy.contains('Развернуть').first().as('button');
  });
  it('Кнопка отключена при пустом инпуте', function () {
    cy.get('@input').should('be.empty').get('@button').should('be.disabled');
  });
  it('Разворот строки работает корректно', function () {
    const step1 = ['ABCD', [changingState, defaultState, defaultState, changingState]]
    const step2 = ['DBCA', [modifiedState, changingState, changingState, modifiedState]]
    const step3 = ['DCBA', [modifiedState, modifiedState, modifiedState, modifiedState]]
    cy.get('@input').should('be.empty').type(step1[0]);
    cy.get('@button').click();
    cy.get(`[${circle}]`).each((el, i) => {
      cy.get(el)
        .should("have.css", "border-color", step1[1][i])
        .contains(step1[0][i])
    });
    cy.get(`[${circle}]`).each((el, i) => {
      cy.get(el)
        .should("have.css", "border-color", step2[1][i])
        .contains(step2[0][i])
    });
    cy.get(`[${circle}]`).each((el, i) => {
      cy.get(el)
        .should("have.css", "border-color", step3[1][i])
        .contains(step3[0][i])
    });
  })
});