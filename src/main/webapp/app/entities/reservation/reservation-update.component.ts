import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IReservation, Reservation } from 'app/shared/model/reservation.model';
import { ReservationService } from './reservation.service';
import { IAgenceVoyage } from 'app/shared/model/agence-voyage.model';
import { AgenceVoyageService } from 'app/entities/agence-voyage/agence-voyage.service';

@Component({
  selector: 'jhi-reservation-update',
  templateUrl: './reservation-update.component.html'
})
export class ReservationUpdateComponent implements OnInit {
  isSaving = false;
  agencevoyages: IAgenceVoyage[] = [];
  dateDp: any;

  editForm = this.fb.group({
    id: [],
    date: [],
    montant: [],
    agencevoyage: []
  });

  constructor(
    protected reservationService: ReservationService,
    protected agenceVoyageService: AgenceVoyageService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ reservation }) => {
      this.updateForm(reservation);

      this.agenceVoyageService.query().subscribe((res: HttpResponse<IAgenceVoyage[]>) => (this.agencevoyages = res.body || []));
    });
  }

  updateForm(reservation: IReservation): void {
    this.editForm.patchValue({
      id: reservation.id,
      date: reservation.date,
      montant: reservation.montant,
      agencevoyage: reservation.agencevoyage
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const reservation = this.createFromForm();
    if (reservation.id !== undefined) {
      this.subscribeToSaveResponse(this.reservationService.update(reservation));
    } else {
      this.subscribeToSaveResponse(this.reservationService.create(reservation));
    }
  }

  private createFromForm(): IReservation {
    return {
      ...new Reservation(),
      id: this.editForm.get(['id'])!.value,
      date: this.editForm.get(['date'])!.value,
      montant: this.editForm.get(['montant'])!.value,
      agencevoyage: this.editForm.get(['agencevoyage'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IReservation>>): void {
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

  trackById(index: number, item: IAgenceVoyage): any {
    return item.id;
  }
}
