import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { DeviseComponentsPage, DeviseDeleteDialog, DeviseUpdatePage } from './devise.page-object';

const expect = chai.expect;

describe('Devise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let deviseComponentsPage: DeviseComponentsPage;
  let deviseUpdatePage: DeviseUpdatePage;
  let deviseDeleteDialog: DeviseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Devises', async () => {
    await navBarPage.goToEntity('devise');
    deviseComponentsPage = new DeviseComponentsPage();
    await browser.wait(ec.visibilityOf(deviseComponentsPage.title), 5000);
    expect(await deviseComponentsPage.getTitle()).to.eq('wegaTravelPartnerManagerApp.devise.home.title');
    await browser.wait(ec.or(ec.visibilityOf(deviseComponentsPage.entities), ec.visibilityOf(deviseComponentsPage.noResult)), 1000);
  });

  it('should load create Devise page', async () => {
    await deviseComponentsPage.clickOnCreateButton();
    deviseUpdatePage = new DeviseUpdatePage();
    expect(await deviseUpdatePage.getPageTitle()).to.eq('wegaTravelPartnerManagerApp.devise.home.createOrEditLabel');
    await deviseUpdatePage.cancel();
  });

  it('should create and save Devises', async () => {
    const nbButtonsBeforeCreate = await deviseComponentsPage.countDeleteButtons();

    await deviseComponentsPage.clickOnCreateButton();

    await promise.all([deviseUpdatePage.setNomInput('nom'), deviseUpdatePage.setCodeInput('code')]);

    expect(await deviseUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await deviseUpdatePage.getCodeInput()).to.eq('code', 'Expected Code value to be equals to code');

    await deviseUpdatePage.save();
    expect(await deviseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await deviseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Devise', async () => {
    const nbButtonsBeforeDelete = await deviseComponentsPage.countDeleteButtons();
    await deviseComponentsPage.clickOnLastDeleteButton();

    deviseDeleteDialog = new DeviseDeleteDialog();
    expect(await deviseDeleteDialog.getDialogTitle()).to.eq('wegaTravelPartnerManagerApp.devise.delete.question');
    await deviseDeleteDialog.clickOnConfirmButton();

    expect(await deviseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
