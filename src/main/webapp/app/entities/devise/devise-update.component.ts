import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IDevise, Devise } from 'app/shared/model/devise.model';
import { DeviseService } from './devise.service';

@Component({
  selector: 'jhi-devise-update',
  templateUrl: './devise-update.component.html'
})
export class DeviseUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nom: [],
    code: []
  });

  constructor(protected deviseService: DeviseService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ devise }) => {
      this.updateForm(devise);
    });
  }

  updateForm(devise: IDevise): void {
    this.editForm.patchValue({
      id: devise.id,
      nom: devise.nom,
      code: devise.code
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const devise = this.createFromForm();
    if (devise.id !== undefined) {
      this.subscribeToSaveResponse(this.deviseService.update(devise));
    } else {
      this.subscribeToSaveResponse(this.deviseService.create(devise));
    }
  }

  private createFromForm(): IDevise {
    return {
      ...new Devise(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      code: this.editForm.get(['code'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDevise>>): void {
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
}
