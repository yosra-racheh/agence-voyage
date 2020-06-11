import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { AgenceVoyageComponentsPage, AgenceVoyageDeleteDialog, AgenceVoyageUpdatePage } from './agence-voyage.page-object';

const expect = chai.expect;

describe('AgenceVoyage e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let agenceVoyageComponentsPage: AgenceVoyageComponentsPage;
  let agenceVoyageUpdatePage: AgenceVoyageUpdatePage;
  let agenceVoyageDeleteDialog: AgenceVoyageDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load AgenceVoyages', async () => {
    await navBarPage.goToEntity('agence-voyage');
    agenceVoyageComponentsPage = new AgenceVoyageComponentsPage();
    await browser.wait(ec.visibilityOf(agenceVoyageComponentsPage.title), 5000);
    expect(await agenceVoyageComponentsPage.getTitle()).to.eq('wegaTravelPartnerManagerApp.agenceVoyage.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(agenceVoyageComponentsPage.entities), ec.visibilityOf(agenceVoyageComponentsPage.noResult)),
      1000
    );
  });

  it('should load create AgenceVoyage page', async () => {
    await agenceVoyageComponentsPage.clickOnCreateButton();
    agenceVoyageUpdatePage = new AgenceVoyageUpdatePage();
    expect(await agenceVoyageUpdatePage.getPageTitle()).to.eq('wegaTravelPartnerManagerApp.agenceVoyage.home.createOrEditLabel');
    await agenceVoyageUpdatePage.cancel();
  });

  it('should create and save AgenceVoyages', async () => {
    const nbButtonsBeforeCreate = await agenceVoyageComponentsPage.countDeleteButtons();

    await agenceVoyageComponentsPage.clickOnCreateButton();

    await promise.all([
      agenceVoyageUpdatePage.setNomInput('nom'),
      agenceVoyageUpdatePage.setLieuInput('lieu'),
      agenceVoyageUpdatePage.setVilleInput('ville'),
      agenceVoyageUpdatePage.commissionSelectLastOption()
      // agenceVoyageUpdatePage.deviseSelectLastOption(),
    ]);

    expect(await agenceVoyageUpdatePage.getNomInput()).to.eq('nom', 'Expected Nom value to be equals to nom');
    expect(await agenceVoyageUpdatePage.getLieuInput()).to.eq('lieu', 'Expected Lieu value to be equals to lieu');
    expect(await agenceVoyageUpdatePage.getVilleInput()).to.eq('ville', 'Expected Ville value to be equals to ville');

    await agenceVoyageUpdatePage.save();
    expect(await agenceVoyageUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await agenceVoyageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last AgenceVoyage', async () => {
    const nbButtonsBeforeDelete = await agenceVoyageComponentsPage.countDeleteButtons();
    await agenceVoyageComponentsPage.clickOnLastDeleteButton();

    agenceVoyageDeleteDialog = new AgenceVoyageDeleteDialog();
    expect(await agenceVoyageDeleteDialog.getDialogTitle()).to.eq('wegaTravelPartnerManagerApp.agenceVoyage.delete.question');
    await agenceVoyageDeleteDialog.clickOnConfirmButton();

    expect(await agenceVoyageComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
