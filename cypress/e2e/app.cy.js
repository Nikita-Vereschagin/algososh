describe('Роутинг:', function() {
  it('main', function() {
    cy.visit('/');
  });
  it('string', function() {
    cy.visit('/recursion');
  });
  it('fibonacci', function() {
    cy.visit('/fibonacci');
  });
  it('sorting', function() {
    cy.visit('/sorting');
  });
  it('stack', function() {
    cy.visit('/stack');
  });
  it('queue', function() {
    cy.visit('/queue');
  });
  it('list', function() {
    cy.visit('/list');
  });
}); 