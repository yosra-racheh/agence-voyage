import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICommission } from 'app/shared/model/commission.model';
import { CommissionService } from './commission.service';
import { CommissionDeleteDialogComponent } from './commission-delete-dialog.component';

@Component({
  selector: 'jhi-commission',
  templateUrl: './commission.component.html'
})
export class CommissionComponent implements OnInit, OnDestroy {
  commissions?: ICommission[];
  eventSubscriber?: Subscription;

  constructor(protected commissionService: CommissionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.commissionService.query().subscribe((res: HttpResponse<ICommission[]>) => (this.commissions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCommissions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICommission): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCommissions(): void {
    this.eventSubscriber = this.eventManager.subscribe('commissionListModification', () => this.loadAll());
  }

  delete(commission: ICommission): void {
    const modalRef = this.modalService.open(CommissionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.commission = commission;
  }
}
