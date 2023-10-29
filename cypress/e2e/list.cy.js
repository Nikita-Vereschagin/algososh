import { appData } from "../tools/app-data";
import { cypressState, cypressClassName } from "../tools/cypress-constants";

const {defaultState, changingState} = cypressState
const {input, circle, circleAll, smallCircle} = cypressClassName

describe('"Связный список" работает', function () {
  beforeEach(() => {
    cy.visit(appData.list);
    cy.contains("Связный список");
    cy.get(`[${input}]`).first().as('inputValue');
    cy.get(`[${input}]`).last().as('inputIndex');
    cy.get(`[${circle}]`).as('circle');
    cy.get(`[${circleAll}]`).as('circleAll');
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
    cy.get('@circleAll').each( (el) => {
      cy.get(el).should("have.css", "border-color", defaultState).contains(/\S{1,4}/);
    });
  });
  it('AddH', function () {
    cy.get('@inputValue').should('be.empty').type('A');
    cy.get('@addH').click();
    cy.get(`[${smallCircle}]`)
      .first()
      .should("have.css", "border-color", changingState)
      .contains('A')
    cy.get('@circleAll')
      .first()
      .should("have.css", "border-color", defaultState)
      .contains('A')
      .parent()
      .parent()
      .contains('head')
  });
  it('AddT', function () {
    cy.get('@inputValue').should('be.empty').type('B');
    cy.get('@addT').click();
    cy.get(`[${smallCircle}]`)
      .first()
      .should("have.css", "border-color", changingState)
      .contains('B')
    cy.get('@circleAll')
      .last()
      .should("have.css", "border-color", defaultState)
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
      cy.get(`[${smallCircle}]`)
        .first()
        .should("have.css", "border-color", changingState)
        .contains('C')
      cy.wait(500);
    };
    cy.get('@circle')
      .eq(2)
      .should("have.css", "border-color", defaultState)
      .contains('C');
  });
  it('delH', function () {
    cy.get('@delH').click();
    cy.get('@circle').its('length').then( (size) => {
      cy.get(`[${smallCircle}]`)
        .first()
        .should("have.css", "border-color", changingState);
      cy.get('@circle').its('length').should('eq', size - 2);
    });
  });
  it('delT', function () {
    cy.get('@delT').click();
    cy.get('@circle').its('length').then( (size) => {
      cy.get(`[${smallCircle}]`)
        .first()
        .should("have.css", "border-color", changingState);
      cy.get('@circle').its('length').should('eq', size - 2);
    });
  });
  it('delI', function () {
    cy.get('@inputIndex').should('be.empty').type(2);
    cy.get('@delI').click();
    for (let i = 0; i < 2; i++) {
      cy.get('@circleAll')
        .eq(i)
        .should("have.css", "border-color", changingState);
    };
    cy.get('@circle').its('length').then( (size) => {
      cy.get(`[${smallCircle}]`)
        .first()
        .should("have.css", "border-color", changingState);
      cy.get('@circle').its('length').should('eq', size - 1);
    });
  });

});