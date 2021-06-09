context('logout', function () {
  before(() => {
    cy.login();
  });

  it('publikovat-změny', function () {
    cy.contains('Publikovat změny').click();
    cy.get('#modal > footer > button').click();
  });

  it('změna-jasu', function () {
    cy.get('body > app-root > div > div > app-navbar > header > div > ul > li.flex > button').click();
  });

  it('odhlášení', function () {
    cy.get('body > app-root > div > div > app-navbar > header > div > ul > li.relative > button').click();
    cy.get(
      'body > app-root > div > div > app-navbar > header > div > ul > li.relative > div > ul > li.flex > a'
    ).click();
  });
});
