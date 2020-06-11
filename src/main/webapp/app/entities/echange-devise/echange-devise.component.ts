import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IEchangeDevise } from 'app/shared/model/echange-devise.model';
import { EchangeDeviseService } from './echange-devise.service';
import { EchangeDeviseDeleteDialogComponent } from './echange-devise-delete-dialog.component';

@Component({
  selector: 'jhi-echange-devise',
  templateUrl: './echange-devise.component.html'
})
export class EchangeDeviseComponent implements OnInit, OnDestroy {
  echangeDevises?: IEchangeDevise[];
  eventSubscriber?: Subscription;

  constructor(
    protected echangeDeviseService: EchangeDeviseService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.echangeDeviseService.query().subscribe((res: HttpResponse<IEchangeDevise[]>) => (this.echangeDevises = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInEchangeDevises();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IEchangeDevise): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInEchangeDevises(): void {
    this.eventSubscriber = this.eventManager.subscribe('echangeDeviseListModification', () => this.loadAll());
  }

  delete(echangeDevise: IEchangeDevise): void {
    const modalRef = this.modalService.open(EchangeDeviseDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.echangeDevise = echangeDevise;
  }
}
