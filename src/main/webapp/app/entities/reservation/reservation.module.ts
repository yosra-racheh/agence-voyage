import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WegaTravelPartnerManagerSharedModule } from 'app/shared/shared.module';
import { ReservationComponent } from './reservation.component';
import { ReservationDetailComponent } from './reservation-detail.component';
import { ReservationUpdateComponent } from './reservation-update.component';
import { ReservationDeleteDialogComponent } from './reservation-delete-dialog.component';
import { reservationRoute } from './reservation.route';

@NgModule({
  imports: [WegaTravelPartnerManagerSharedModule, RouterModule.forChild(reservationRoute)],
  declarations: [ReservationComponent, ReservationDetailComponent, ReservationUpdateComponent, ReservationDeleteDialogComponent],
  entryComponents: [ReservationDeleteDialogComponent]
})
export class WegaTravelPartnerManagerReservationModule {}
