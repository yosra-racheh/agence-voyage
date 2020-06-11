import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDevise } from 'app/shared/model/devise.model';
import { DeviseService } from './devise.service';
import { DeviseDeleteDialogComponent } from './devise-delete-dialog.component';

@Component({
  selector: 'jhi-devise',
  templateUrl: './devise.component.html'
})
export class DeviseComponent implements OnInit, OnDestroy {
  devises?: IDevise[];
  eventSubscriber?: Subscription;

  constructor(protected deviseService: DeviseService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.deviseService.query().subscribe((res: HttpResponse<IDevise[]>) => (this.devises = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInDevises();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IDevise): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInDevises(): void {
    this.eventSubscriber = this.eventManager.subscribe('deviseListModification', () => this.loadAll());
  }

  delete(devise: IDevise): void {
    const modalRef = this.modalService.open(DeviseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.devise = devise;
  }
}
