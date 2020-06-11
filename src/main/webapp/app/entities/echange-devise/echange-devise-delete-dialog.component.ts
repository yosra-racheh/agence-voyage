import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEchangeDevise } from 'app/shared/model/echange-devise.model';
import { EchangeDeviseService } from './echange-devise.service';

@Component({
  templateUrl: './echange-devise-delete-dialog.component.html'
})
export class EchangeDeviseDeleteDialogComponent {
  echangeDevise?: IEchangeDevise;

  constructor(
    protected echangeDeviseService: EchangeDeviseService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.echangeDeviseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('echangeDeviseListModification');
      this.activeModal.close();
    });
  }
}
