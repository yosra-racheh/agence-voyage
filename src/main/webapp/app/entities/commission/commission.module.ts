import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WegaTravelPartnerManagerSharedModule } from 'app/shared/shared.module';
import { CommissionComponent } from './commission.component';
import { CommissionDetailComponent } from './commission-detail.component';
import { CommissionUpdateComponent } from './commission-update.component';
import { CommissionDeleteDialogComponent } from './commission-delete-dialog.component';
import { commissionRoute } from './commission.route';

@NgModule({
  imports: [WegaTravelPartnerManagerSharedModule, RouterModule.forChild(commissionRoute)],
  declarations: [CommissionComponent, CommissionDetailComponent, CommissionUpdateComponent, CommissionDeleteDialogComponent],
  entryComponents: [CommissionDeleteDialogComponent]
})
export class WegaTravelPartnerManagerCommissionModule {}
