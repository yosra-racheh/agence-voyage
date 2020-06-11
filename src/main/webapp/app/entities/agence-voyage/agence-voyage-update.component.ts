import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgenceVoyage, AgenceVoyage } from 'app/shared/model/agence-voyage.model';
import { AgenceVoyageService } from './agence-voyage.service';
import { ICommission } from 'app/shared/model/commission.model';
import { CommissionService } from 'app/entities/commission/commission.service';
import { IDevise } from 'app/shared/model/devise.model';
import { DeviseService } from 'app/entities/devise/devise.service';

type SelectableEntity = ICommission | IDevise;

@Component({
  selector: 'jhi-agence-voyage-update',
  templateUrl: './agence-voyage-update.component.html'
})
export class AgenceVoyageUpdateComponent implements OnInit {
  isSaving = false;
  commissions: ICommission[] = [];
  devises: IDevise[] = [];

  editForm = this.fb.group({
    id: [],
    nom: [],
    lieu: [],
    ville: [],
    commission: [],
    devises: []
  });

  constructor(
    protected agenceVoyageService: AgenceVoyageService,
    protected commissionService: CommissionService,
    protected deviseService: DeviseService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agenceVoyage }) => {
      this.updateForm(agenceVoyage);

      this.commissionService.query().subscribe((res: HttpResponse<ICommission[]>) => (this.commissions = res.body || []));

      this.deviseService.query().subscribe((res: HttpResponse<IDevise[]>) => (this.devises = res.body || []));
    });
  }

  updateForm(agenceVoyage: IAgenceVoyage): void {
    this.editForm.patchValue({
      id: agenceVoyage.id,
      nom: agenceVoyage.nom,
      lieu: agenceVoyage.lieu,
      ville: agenceVoyage.ville,
      commission: agenceVoyage.commission,
      devises: agenceVoyage.devises
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agenceVoyage = this.createFromForm();
    if (agenceVoyage.id !== undefined) {
      this.subscribeToSaveResponse(this.agenceVoyageService.update(agenceVoyage));
    } else {
      this.subscribeToSaveResponse(this.agenceVoyageService.create(agenceVoyage));
    }
  }

  private createFromForm(): IAgenceVoyage {
    return {
      ...new AgenceVoyage(),
      id: this.editForm.get(['id'])!.value,
      nom: this.editForm.get(['nom'])!.value,
      lieu: this.editForm.get(['lieu'])!.value,
      ville: this.editForm.get(['ville'])!.value,
      commission: this.editForm.get(['commission'])!.value,
      devises: this.editForm.get(['devises'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgenceVoyage>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }

  getSelected(selectedVals: IDevise[], option: IDevise): IDevise {
    if (selectedVals) {
      for (let i = 0; i < selectedVals.length; i++) {
        if (option.id === selectedVals[i].id) {
          return selectedVals[i];
        }
      }
    }
    return option;
  }
}
