import { appData } from "../tools/app-data";
import { cypressState } from "../tools/cypress-constants";

const {defaultState, changingState} = cypressState

describe('"Стек" работает.', function () {
  beforeEach(() => {
    cy.visit(appData.stack);
    cy.contains("Стек");
    cy.get('[class^=input_input__]').first().as('input');
    cy.contains('Добавить').first().as('add');
    cy.contains('Удалить').first().as('del');
    cy.contains('Очистить').first().as('clear');
  });
  it('Кнопки отключены при пустом инпуте', function () {
    cy.get('@input').should('be.empty')
      .get('@add').should('be.disabled')
      .get('@del').should('be.disabled')
      .get('@clear').should('be.disabled')
  });
  it('Add работает корректно', function () {
    cy.get('@input').should('be.empty').type('A');
    cy.get('@add').click();
    cy.get('[class^=circle_circle__]')//[class^=circle_circle__] не выношу в константу, так как изначально [class^=circle_circle__] не существует
      .should("have.css", "border-color", changingState)
      .contains('A')
    cy.get('[class^=circle_circle__]')
      .should("have.css", "border-color", defaultState)
  });
  it('Del работает корректно', function () {
    if (cy.get('[class^=circle_circle__]').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type('B');
      cy.get('@add').click();
    }
    cy.get('@del').click();
    cy.get('[class^=circle_circle__]').should("have.length", 0);
  });
  it('Clear работает корректно', function () {
    if (cy.get('[class^=circle_circle__]').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type('C');
      cy.get('@add').click();
    }
    cy.get('@clear').click();
    cy.get('[class^=circle_circle__]').should("have.length", 0);
  });
});