import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WegaTravelPartnerManagerSharedModule } from 'app/shared/shared.module';
import { EchangeDeviseComponent } from './echange-devise.component';
import { EchangeDeviseDetailComponent } from './echange-devise-detail.component';
import { EchangeDeviseUpdateComponent } from './echange-devise-update.component';
import { EchangeDeviseDeleteDialogComponent } from './echange-devise-delete-dialog.component';
import { echangeDeviseRoute } from './echange-devise.route';

@NgModule({
  imports: [WegaTravelPartnerManagerSharedModule, RouterModule.forChild(echangeDeviseRoute)],
  declarations: [EchangeDeviseComponent, EchangeDeviseDetailComponent, EchangeDeviseUpdateComponent, EchangeDeviseDeleteDialogComponent],
  entryComponents: [EchangeDeviseDeleteDialogComponent]
})
export class WegaTravelPartnerManagerEchangeDeviseModule {}
