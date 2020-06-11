import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EchangeDeviseComponentsPage, EchangeDeviseDeleteDialog, EchangeDeviseUpdatePage } from './echange-devise.page-object';

const expect = chai.expect;

describe('EchangeDevise e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let echangeDeviseComponentsPage: EchangeDeviseComponentsPage;
  let echangeDeviseUpdatePage: EchangeDeviseUpdatePage;
  let echangeDeviseDeleteDialog: EchangeDeviseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load EchangeDevises', async () => {
    await navBarPage.goToEntity('echange-devise');
    echangeDeviseComponentsPage = new EchangeDeviseComponentsPage();
    await browser.wait(ec.visibilityOf(echangeDeviseComponentsPage.title), 5000);
    expect(await echangeDeviseComponentsPage.getTitle()).to.eq('wegaTravelPartnerManagerApp.echangeDevise.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(echangeDeviseComponentsPage.entities), ec.visibilityOf(echangeDeviseComponentsPage.noResult)),
      1000
    );
  });

  it('should load create EchangeDevise page', async () => {
    await echangeDeviseComponentsPage.clickOnCreateButton();
    echangeDeviseUpdatePage = new EchangeDeviseUpdatePage();
    expect(await echangeDeviseUpdatePage.getPageTitle()).to.eq('wegaTravelPartnerManagerApp.echangeDevise.home.createOrEditLabel');
    await echangeDeviseUpdatePage.cancel();
  });

  it('should create and save EchangeDevises', async () => {
    const nbButtonsBeforeCreate = await echangeDeviseComponentsPage.countDeleteButtons();

    await echangeDeviseComponentsPage.clickOnCreateButton();

    await promise.all([
      echangeDeviseUpdatePage.setCode1Input('code1'),
      echangeDeviseUpdatePage.setCode2Input('code2'),
      echangeDeviseUpdatePage.setTauxchangeInput('5'),
      echangeDeviseUpdatePage.deviseSelectLastOption()
    ]);

    expect(await echangeDeviseUpdatePage.getCode1Input()).to.eq('code1', 'Expected Code1 value to be equals to code1');
    expect(await echangeDeviseUpdatePage.getCode2Input()).to.eq('code2', 'Expected Code2 value to be equals to code2');
    expect(await echangeDeviseUpdatePage.getTauxchangeInput()).to.eq('5', 'Expected tauxchange value to be equals to 5');

    await echangeDeviseUpdatePage.save();
    expect(await echangeDeviseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await echangeDeviseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last EchangeDevise', async () => {
    const nbButtonsBeforeDelete = await echangeDeviseComponentsPage.countDeleteButtons();
    await echangeDeviseComponentsPage.clickOnLastDeleteButton();

    echangeDeviseDeleteDialog = new EchangeDeviseDeleteDialog();
    expect(await echangeDeviseDeleteDialog.getDialogTitle()).to.eq('wegaTravelPartnerManagerApp.echangeDevise.delete.question');
    await echangeDeviseDeleteDialog.clickOnConfirmButton();

    expect(await echangeDeviseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
