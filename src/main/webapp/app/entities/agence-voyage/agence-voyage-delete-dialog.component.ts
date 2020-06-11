import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgenceVoyage } from 'app/shared/model/agence-voyage.model';
import { AgenceVoyageService } from './agence-voyage.service';

@Component({
  templateUrl: './agence-voyage-delete-dialog.component.html'
})
export class AgenceVoyageDeleteDialogComponent {
  agenceVoyage?: IAgenceVoyage;

  constructor(
    protected agenceVoyageService: AgenceVoyageService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agenceVoyageService.delete(id).subscribe(() => {
      this.eventManager.broadcast('agenceVoyageListModification');
      this.activeModal.close();
    });
  }
}
