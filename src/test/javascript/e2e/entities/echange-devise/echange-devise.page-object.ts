import { element, by, ElementFinder } from 'protractor';

export class EchangeDeviseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-echange-devise div table .btn-danger'));
  title = element.all(by.css('jhi-echange-devise div h2#page-heading span')).first();
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

export class EchangeDeviseUpdatePage {
  pageTitle = element(by.id('jhi-echange-devise-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  code1Input = element(by.id('field_code1'));
  code2Input = element(by.id('field_code2'));
  tauxchangeInput = element(by.id('field_tauxchange'));

  deviseSelect = element(by.id('field_devise'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCode1Input(code1: string): Promise<void> {
    await this.code1Input.sendKeys(code1);
  }

  async getCode1Input(): Promise<string> {
    return await this.code1Input.getAttribute('value');
  }

  async setCode2Input(code2: string): Promise<void> {
    await this.code2Input.sendKeys(code2);
  }

  async getCode2Input(): Promise<string> {
    return await this.code2Input.getAttribute('value');
  }

  async setTauxchangeInput(tauxchange: string): Promise<void> {
    await this.tauxchangeInput.sendKeys(tauxchange);
  }

  async getTauxchangeInput(): Promise<string> {
    return await this.tauxchangeInput.getAttribute('value');
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

export class EchangeDeviseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-echangeDevise-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-echangeDevise'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
