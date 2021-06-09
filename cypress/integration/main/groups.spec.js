context('Skupiny', function () {
  before(() => {
    cy.login();
  });

  it('klik_na_záložku', function () {
    cy.contains('Skupiny panelů').click();
    cy.get(
      'body > app-root > div > app-sidebar > aside.z-20.hidden.min-h-screen.h-full.w-64.overflow-y-auto.bg-white.dark\\:bg-gray-800.md\\:block.flex-shrink-0 > div > ul:nth-child(3) > li:nth-child(6) > div > ul > li:nth-child(1) > a'
    ).click();
  });

  it('vytvořit', function () {
    cy.get(
      'body > app-root > div > div > ng-component > main > div > ng2-smart-table > table > thead > tr.ng2-smart-filters > th.ng2-smart-actions-title.ng2-smart-actions-title-add > a'
    ).click();
    cy.contains('Název').type('ahoj123');
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div > div > form > div.mt-4 > label > select'
    ).select('aa', { force: true });
    cy.get('body > app-root > div > div > ng-component > main > div > div > div > form > div.mt-8 > button').click();
  });

  it('smazat', function () {
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div.flex.justify-between > div > a.ml-1.btn.btn-sm.btn-danger'
    ).click();
    cy.get(
      '#modal > footer > button.w-full.px-5.py-3.text-sm.font-medium.leading-5.text-white.transition-colors.duration-150.bg-red-600.border.border-transparent.rounded-lg.sm\\:w-auto.sm\\:px-4.sm\\:py-2.active\\:bg-red-600.hover\\:bg-red-700.focus\\:outline-none.focus\\:shadow-outline-purple'
    ).click({ multiple: true });
    //cy.get("#delete-assetassign-modal").contains("Smazat").click();
  });

  it('Detail_upravit(pridat_assetlisty)', function () {
    cy.get(
      'body > app-root > div > div > ng-component > main > div > ng2-smart-table > table > tbody > tr.ng2-smart-row.selected > td.ng2-smart-actions > ng2-st-tbody-edit-delete > a.ng2-smart-action.ng2-smart-action-edit-edit'
    ).click();
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div.min-w-0.p-4.bg-white.rounded-lg.shadow-xs.dark\\:bg-gray-800 > ng2-smart-table > table > thead > tr.ng2-smart-filters > th.ng2-smart-actions-title.ng2-smart-actions-title-add > a'
    ).click();
    cy.get('#modal > form > div > label > select').select('z', { force: true });
    cy.get(
      '#modal > form > footer > button.w-full.px-5.py-3.text-sm.font-medium.leading-5.text-white.transition-colors.duration-150.bg-purple-600.border.border-transparent.rounded-lg.sm\\:w-auto.sm\\:px-4.sm\\:py-2.active\\:bg-purple-600.hover\\:bg-purple-700.focus\\:outline-none.focus\\:shadow-outline-purple'
    ).click();
  });

  it('Detail-upravit(skupinu', function () {
    cy.get(
      'body > app-root > div > div > ng-component > main > div > div.flex.justify-between > div > a.mr-1.btn.btn-sm.btn-secondary'
    ).click();
    cy.contains('Název').type('0777testwudjgwjhdg');
    cy.get('body > app-root > div > div > ng-component > main > div > div > div > form > div.mt-8 > button').click();
  });
});
