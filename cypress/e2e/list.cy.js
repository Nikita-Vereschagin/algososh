import { appData } from "../tools/app-data";
import { cypressState } from "../tools/cypress-constants";

describe('"Связный список" работает', function () {
  beforeEach(() => {
    cy.visit(appData.url);
    cy.get('[data-test="list"]').click();
    cy.contains("Связный список");
    cy.get('[class^=input_input__]').first().as('inputValue');
    cy.get('[class^=input_input__]').last().as('inputIndex');
    cy.contains('Добавить в head').first().as('addH');
    cy.contains('Добавить в tail').first().as('addT');
    cy.contains('Удалить из head').first().as('delH');
    cy.contains('Удалить из tail').first().as('delT');
    cy.contains('Добавить по индексу').first().as('addI');
    cy.contains('Удалить по индексу').first().as('delI');
  });
  it('Кнопки отключены при пустых инпутах', function () {
    cy.get('@inputValue').should('be.empty')
      .get('@addH').should('be.disabled')
      .get('@addT').should('be.disabled')
      .get('@addI').should('be.disabled')
    cy.get('@inputIndex').should('be.empty')
      .get('@addI').should('be.disabled')
      .get('@delI').should('be.disabled');
  });
  it('Начальный список', function () {
    cy.get('[class*=circle_circle__]').each( (el) => {
      cy.get(el).should("have.css", "border-color", cypressState.default).contains(/\S{1,4}/);
    });
  });
  it('AddH', function () {
    cy.get('@inputValue').should('be.empty').type('A');
    cy.get('@addH').click();
    cy.get('[class*=circle_small__]')
      .first()
      .should("have.css", "border-color", cypressState.changing)
      .contains('A')
    cy.get('[class*=circle_circle__]')
      .first()
      .should("have.css", "border-color", cypressState.default)
      .contains('A')
      .parent()
      .parent()
      .contains('head')
  });
  it('AddT', function () {
    cy.get('@inputValue').should('be.empty').type('B');
    cy.get('@addT').click();
    cy.get('[class*=circle_small__]')
      .first()
      .should("have.css", "border-color", cypressState.changing)
      .contains('B')
    cy.get('[class*=circle_circle__]')
      .last()
      .should("have.css", "border-color", cypressState.default)
      .contains('B')
      .parent()
      .parent()
      .contains('tail')
  });
  it('AddI', function () {
    cy.get('@inputValue').should('be.empty').type('C');
    cy.get('@inputIndex').should('be.empty').type(2);
    cy.get('@addI').click();
    for (let i = 0; i < 2; i++) {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", cypressState.changing)
        .contains('C')
      cy.wait(500);
    };
    cy.get('[class^=circle_circle__]')
      .eq(2)
      .should("have.css", "border-color", cypressState.default)
      .contains('C');
  });
  it('delH', function () {
    cy.get('@delH').click();
    cy.get('[class^=circle_circle__]').its('length').then( (size) => {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", cypressState.changing);
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 2);
    });
  });
  it('delT', function () {
    cy.get('@delT').click();
    cy.get('[class^=circle_circle__]').its('length').then( (size) => {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", cypressState.changing);
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 2);
    });
  });
  it('delI', function () {
    cy.get('@inputIndex').should('be.empty').type(2);
    cy.get('@delI').click();
    for (let i = 0; i < 2; i++) {
      cy.get('[class*=circle_circle__]')
        .eq(i)
        .should("have.css", "border-color", cypressState.changing);
    };
    cy.get('[class^=circle_circle__]').its('length').then( (size) => {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", cypressState.changing);
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 1);
    });
  });

});