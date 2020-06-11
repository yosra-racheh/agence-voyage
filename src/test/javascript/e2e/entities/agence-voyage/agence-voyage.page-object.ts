import { element, by, ElementFinder } from 'protractor';

export class AgenceVoyageComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-agence-voyage div table .btn-danger'));
  title = element.all(by.css('jhi-agence-voyage div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class AgenceVoyageUpdatePage {
  pageTitle = element(by.id('jhi-agence-voyage-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nomInput = element(by.id('field_nom'));
  lieuInput = element(by.id('field_lieu'));
  villeInput = element(by.id('field_ville'));

  commissionSelect = element(by.id('field_commission'));
  deviseSelect = element(by.id('field_devise'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNomInput(nom: string): Promise<void> {
    await this.nomInput.sendKeys(nom);
  }

  async getNomInput(): Promise<string> {
    return await this.nomInput.getAttribute('value');
  }

  async setLieuInput(lieu: string): Promise<void> {
    await this.lieuInput.sendKeys(lieu);
  }

  async getLieuInput(): Promise<string> {
    return await this.lieuInput.getAttribute('value');
  }

  async setVilleInput(ville: string): Promise<void> {
    await this.villeInput.sendKeys(ville);
  }

  async getVilleInput(): Promise<string> {
    return await this.villeInput.getAttribute('value');
  }

  async commissionSelectLastOption(): Promise<void> {
    await this.commissionSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async commissionSelectOption(option: string): Promise<void> {
    await this.commissionSelect.sendKeys(option);
  }

  getCommissionSelect(): ElementFinder {
    return this.commissionSelect;
  }

  async getCommissionSelectedOption(): Promise<string> {
    return await this.commissionSelect.element(by.css('option:checked')).getText();
  }

  async deviseSelectLastOption(): Promise<void> {
    await this.deviseSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async deviseSelectOption(option: string): Promise<void> {
    await this.deviseSelect.sendKeys(option);
  }

  getDeviseSelect(): ElementFinder {
    return this.deviseSelect;
  }

  async getDeviseSelectedOption(): Promise<string> {
    return await this.deviseSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class AgenceVoyageDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-agenceVoyage-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-agenceVoyage'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
