import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDevise } from 'app/shared/model/devise.model';
import { DeviseService } from './devise.service';

@Component({
  templateUrl: './devise-delete-dialog.component.html'
})
export class DeviseDeleteDialogComponent {
  devise?: IDevise;

  constructor(protected deviseService: DeviseService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.deviseService.delete(id).subscribe(() => {
      this.eventManager.broadcast('deviseListModification');
      this.activeModal.close();
    });
  }
}
