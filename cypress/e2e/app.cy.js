import { appData } from "../tools/app-data";

describe('Роутинг:', function() {
  it('main', function() {
    cy.visit(appData.url);
  });
  it('string', function() {
    cy.visit(appData.string);
  });
  it('fibonacci', function() {
    cy.visit(appData.fibonacci);
  });
  it('sorting', function() {
    cy.visit(appData.sorting);
  });
  it('stack', function() {
    cy.visit(appData.stack);
  });
  it('queue', function() {
    cy.visit(appData.queue);
  });
  it('list', function() {
    cy.visit(appData.list);
  });
}); 