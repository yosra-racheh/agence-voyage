import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WegaTravelPartnerManagerSharedModule } from 'app/shared/shared.module';
import { DeviseComponent } from './devise.component';
import { DeviseDetailComponent } from './devise-detail.component';
import { DeviseUpdateComponent } from './devise-update.component';
import { DeviseDeleteDialogComponent } from './devise-delete-dialog.component';
import { deviseRoute } from './devise.route';

@NgModule({
  imports: [WegaTravelPartnerManagerSharedModule, RouterModule.forChild(deviseRoute)],
  declarations: [DeviseComponent, DeviseDetailComponent, DeviseUpdateComponent, DeviseDeleteDialogComponent],
  entryComponents: [DeviseDeleteDialogComponent]
})
export class WegaTravelPartnerManagerDeviseModule {}
