import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgenceVoyage } from 'app/shared/model/agence-voyage.model';
import { AgenceVoyageService } from './agence-voyage.service';
import { AgenceVoyageDeleteDialogComponent } from './agence-voyage-delete-dialog.component';

@Component({
  selector: 'jhi-agence-voyage',
  templateUrl: './agence-voyage.component.html'
})
export class AgenceVoyageComponent implements OnInit, OnDestroy {
  agenceVoyages?: IAgenceVoyage[];
  eventSubscriber?: Subscription;

  constructor(
    protected agenceVoyageService: AgenceVoyageService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.agenceVoyageService.query().subscribe((res: HttpResponse<IAgenceVoyage[]>) => (this.agenceVoyages = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgenceVoyages();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgenceVoyage): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgenceVoyages(): void {
    this.eventSubscriber = this.eventManager.subscribe('agenceVoyageListModification', () => this.loadAll());
  }

  delete(agenceVoyage: IAgenceVoyage): void {
    const modalRef = this.modalService.open(AgenceVoyageDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agenceVoyage = agenceVoyage;
  }
}
