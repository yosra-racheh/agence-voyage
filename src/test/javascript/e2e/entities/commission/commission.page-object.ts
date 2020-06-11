import { element, by, ElementFinder } from 'protractor';

export class CommissionComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-commission div table .btn-danger'));
  title = element.all(by.css('jhi-commission div h2#page-heading span')).first();
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

export class CommissionUpdatePage {
  pageTitle = element(by.id('jhi-commission-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  tauxInput = element(by.id('field_taux'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setTauxInput(taux: string): Promise<void> {
    await this.tauxInput.sendKeys(taux);
  }

  async getTauxInput(): Promise<string> {
    return await this.tauxInput.getAttribute('value');
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

export class CommissionDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-commission-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-commission'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
