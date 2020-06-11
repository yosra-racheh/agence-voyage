import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IEchangeDevise, EchangeDevise } from 'app/shared/model/echange-devise.model';
import { EchangeDeviseService } from './echange-devise.service';
import { IDevise } from 'app/shared/model/devise.model';
import { DeviseService } from 'app/entities/devise/devise.service';

@Component({
  selector: 'jhi-echange-devise-update',
  templateUrl: './echange-devise-update.component.html'
})
export class EchangeDeviseUpdateComponent implements OnInit {
  isSaving = false;
  devises: IDevise[] = [];

  editForm = this.fb.group({
    id: [],
    code1: [],
    code2: [],
    tauxchange: [],
    devise: []
  });

  constructor(
    protected echangeDeviseService: EchangeDeviseService,
    protected deviseService: DeviseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ echangeDevise }) => {
      this.updateForm(echangeDevise);

      this.deviseService.query().subscribe((res: HttpResponse<IDevise[]>) => (this.devises = res.body || []));
    });
  }

  updateForm(echangeDevise: IEchangeDevise): void {
    this.editForm.patchValue({
      id: echangeDevise.id,
      code1: echangeDevise.code1,
      code2: echangeDevise.code2,
      tauxchange: echangeDevise.tauxchange,
      devise: echangeDevise.devise
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const echangeDevise = this.createFromForm();
    if (echangeDevise.id !== undefined) {
      this.subscribeToSaveResponse(this.echangeDeviseService.update(echangeDevise));
    } else {
      this.subscribeToSaveResponse(this.echangeDeviseService.create(echangeDevise));
    }
  }

  private createFromForm(): IEchangeDevise {
    return {
      ...new EchangeDevise(),
      id: this.editForm.get(['id'])!.value,
      code1: this.editForm.get(['code1'])!.value,
      code2: this.editForm.get(['code2'])!.value,
      tauxchange: this.editForm.get(['tauxchange'])!.value,
      devise: this.editForm.get(['devise'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEchangeDevise>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: IDevise): any {
    return item.id;
  }
}
