import { appData } from "../tools/app-data";
const {string, fibonacci, sorting, stack, queue, list} = appData
describe('Роутинг:', function() {
  it('main', function() {
    cy.visit('/');
  });
  it('string', function() {
    cy.visit(string);
  });
  it('fibonacci', function() {
    cy.visit(fibonacci);
  });
  it('sorting', function() {
    cy.visit(sorting);
  });
  it('stack', function() {
    cy.visit(stack);
  });
  it('queue', function() {
    cy.visit(queue);
  });
  it('list', function() {
    cy.visit(list);
  });
}); 