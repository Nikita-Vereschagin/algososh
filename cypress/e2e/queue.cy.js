import { appData } from "../tools/app-data";
import { cypressState } from "../tools/cypress-constants";

const {defaultState, changingState} = cypressState

describe('"Очередь" работает.', function () {
  beforeEach(() => {
    cy.visit(appData.queue);
    cy.contains("Очередь");
    cy.get('[class^=input_input__]').first().as('input');
    cy.get('[class^=circle_circle__]').as('circle');
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
    cy.get('@circle')
      .should("have.css", "border-color",changingState)
      .contains('A')
      .parent()
      .parent()
      .contains('top')
      .parent()
      .contains('tail')
    cy.get('@circle')
      .should("have.css", "border-color", defaultState)
  });
  it('Del работает корректно', function () {
    if (cy.get('@circle').first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type('B');
      cy.get('@add').click();
    }
    cy.get('@del').click();
    cy.get('@circle')
      .first()
      .should("have.css", "border-color",changingState)
    cy.get('@circle')
      .first()
      .should("have.css", "border-color", defaultState)
    cy.get('@circle').each( (el) => {
      cy.get(el).contains('tail').should("have.length", 0);
    });
  });
  it('Clear работает корректно', function () {
    if (cy.get('@circle').first().contains('tail').should("have.length", 0)) {
      cy.get('@input').should('be.empty').type('C');
      cy.get('@add').click();
    }
    cy.get('@clear').click();
    cy.get('@circle').each( ($el) => {
      cy.get($el).contains('head').should("have.length", 0);
      cy.get($el).should("have.css", "border-color", defaultState);
    });
  });
});