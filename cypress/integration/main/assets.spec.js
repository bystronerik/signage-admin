context('videa_obrázky', function () {
  before(() => {
    cy.login();
  });

  it('klik_na_záložku', function () {
    cy.contains('Obrázky a videa');
    cy.get(
      'body > app-root > div > app-sidebar > aside.z-20.hidden.min-h-screen.h-full.w-64.overflow-y-auto.bg-white.dark\\:bg-gray-800.md\\:block.flex-shrink-0 > div > ul:nth-child(3) > li:nth-child(4) > div > ul > li:nth-child(1) > a'
    ).click();
    cy.url().should('include', '/assets');
  });

  it('vytvořit', function () {
    cy.get('body > app-root > div > div > ng-component > main').contains('Vytvořit').click();
    cy.contains('Název').type('admin');
    cy.contains('Délka zobrazení (sekundy)').type('100');

    cy.fixture('jedna.png').then((fileContent) => {
      cy.get('input[type="file"]').attachFile({
        fileContent: fileContent.toString(),
        fileName: 'jedna.png',
        mimeType: 'image/png',
      });
    });

    cy.get('#toggle').click();
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div > div > form > div.mt-4.flex.justify-between > label:nth-child(1) > input'
    ).type('2033-11-11T02:02');
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div > div > form > div.mt-4.flex.justify-between > label:nth-child(2) > input'
    ).type('2001-11-02T03:10');
    cy.get('body > app-root > div > div > ng-component > main > div > div > div > form > div.mt-8 > button').click();
  });

  it('smazat', function () {
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div.flex.justify-between > div > a.ml-1.btn.btn-sm.btn-danger'
    ).click();
    cy.get('#delete-asset-modal').contains('Smazat').click();
  });

  it('upravit', function () {
    cy.contains('Detail');
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div.min-w-0.p-4.bg-white.rounded-lg.shadow-xs.dark\\:bg-gray-800 > div.mt-4 > ng2-smart-table:nth-child(2) > table > thead > tr.ng2-smart-filters > th.id.ng2-smart-th > ng2-smart-table-filter > div > default-table-filter > input-filter > input'
    ).type('123');
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div.min-w-0.p-4.bg-white.rounded-lg.shadow-xs.dark\\:bg-gray-800 > div.mt-4 > ng2-smart-table:nth-child(2) > table > thead > tr.ng2-smart-filters > th.name.ng2-smart-th > ng2-smart-table-filter > div > default-table-filter > input-filter > input'
    ).type('pokus');
    cy.contains('Přidat').click();
  });
});
