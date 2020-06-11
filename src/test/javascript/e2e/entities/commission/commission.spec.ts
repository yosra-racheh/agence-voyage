import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { CommissionComponentsPage, CommissionDeleteDialog, CommissionUpdatePage } from './commission.page-object';

const expect = chai.expect;

describe('Commission e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let commissionComponentsPage: CommissionComponentsPage;
  let commissionUpdatePage: CommissionUpdatePage;
  let commissionDeleteDialog: CommissionDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Commissions', async () => {
    await navBarPage.goToEntity('commission');
    commissionComponentsPage = new CommissionComponentsPage();
    await browser.wait(ec.visibilityOf(commissionComponentsPage.title), 5000);
    expect(await commissionComponentsPage.getTitle()).to.eq('wegaTravelPartnerManagerApp.commission.home.title');
    await browser.wait(ec.or(ec.visibilityOf(commissionComponentsPage.entities), ec.visibilityOf(commissionComponentsPage.noResult)), 1000);
  });

  it('should load create Commission page', async () => {
    await commissionComponentsPage.clickOnCreateButton();
    commissionUpdatePage = new CommissionUpdatePage();
    expect(await commissionUpdatePage.getPageTitle()).to.eq('wegaTravelPartnerManagerApp.commission.home.createOrEditLabel');
    await commissionUpdatePage.cancel();
  });

  it('should create and save Commissions', async () => {
    const nbButtonsBeforeCreate = await commissionComponentsPage.countDeleteButtons();

    await commissionComponentsPage.clickOnCreateButton();

    await promise.all([commissionUpdatePage.setTauxInput('taux')]);

    expect(await commissionUpdatePage.getTauxInput()).to.eq('taux', 'Expected Taux value to be equals to taux');

    await commissionUpdatePage.save();
    expect(await commissionUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await commissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Commission', async () => {
    const nbButtonsBeforeDelete = await commissionComponentsPage.countDeleteButtons();
    await commissionComponentsPage.clickOnLastDeleteButton();

    commissionDeleteDialog = new CommissionDeleteDialog();
    expect(await commissionDeleteDialog.getDialogTitle()).to.eq('wegaTravelPartnerManagerApp.commission.delete.question');
    await commissionDeleteDialog.clickOnConfirmButton();

    expect(await commissionComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
