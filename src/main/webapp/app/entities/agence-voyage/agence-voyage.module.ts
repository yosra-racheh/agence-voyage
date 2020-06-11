import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WegaTravelPartnerManagerSharedModule } from 'app/shared/shared.module';
import { AgenceVoyageComponent } from './agence-voyage.component';
import { AgenceVoyageDetailComponent } from './agence-voyage-detail.component';
import { AgenceVoyageUpdateComponent } from './agence-voyage-update.component';
import { AgenceVoyageDeleteDialogComponent } from './agence-voyage-delete-dialog.component';
import { agenceVoyageRoute } from './agence-voyage.route';

@NgModule({
  imports: [WegaTravelPartnerManagerSharedModule, RouterModule.forChild(agenceVoyageRoute)],
  declarations: [AgenceVoyageComponent, AgenceVoyageDetailComponent, AgenceVoyageUpdateComponent, AgenceVoyageDeleteDialogComponent],
  entryComponents: [AgenceVoyageDeleteDialogComponent]
})
export class WegaTravelPartnerManagerAgenceVoyageModule {}
