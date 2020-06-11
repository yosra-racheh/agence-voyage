import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'agence-voyage',
        loadChildren: () => import('./agence-voyage/agence-voyage.module').then(m => m.WegaTravelPartnerManagerAgenceVoyageModule)
      },
      {
        path: 'reservation',
        loadChildren: () => import('./reservation/reservation.module').then(m => m.WegaTravelPartnerManagerReservationModule)
      },
      {
        path: 'commission',
        loadChildren: () => import('./commission/commission.module').then(m => m.WegaTravelPartnerManagerCommissionModule)
      },
      {
        path: 'devise',
        loadChildren: () => import('./devise/devise.module').then(m => m.WegaTravelPartnerManagerDeviseModule)
      },
      {
        path: 'echange-devise',
        loadChildren: () => import('./echange-devise/echange-devise.module').then(m => m.WegaTravelPartnerManagerEchangeDeviseModule)
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ]
})
export class WegaTravelPartnerManagerEntityModule {}
