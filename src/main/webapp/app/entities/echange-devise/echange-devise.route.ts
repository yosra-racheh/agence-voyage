import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEchangeDevise, EchangeDevise } from 'app/shared/model/echange-devise.model';
import { EchangeDeviseService } from './echange-devise.service';
import { EchangeDeviseComponent } from './echange-devise.component';
import { EchangeDeviseDetailComponent } from './echange-devise-detail.component';
import { EchangeDeviseUpdateComponent } from './echange-devise-update.component';

@Injectable({ providedIn: 'root' })
export class EchangeDeviseResolve implements Resolve<IEchangeDevise> {
  constructor(private service: EchangeDeviseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEchangeDevise> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((echangeDevise: HttpResponse<EchangeDevise>) => {
          if (echangeDevise.body) {
            return of(echangeDevise.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new EchangeDevise());
  }
}

export const echangeDeviseRoute: Routes = [
  {
    path: '',
    component: EchangeDeviseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.echangeDevise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EchangeDeviseDetailComponent,
    resolve: {
      echangeDevise: EchangeDeviseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.echangeDevise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EchangeDeviseUpdateComponent,
    resolve: {
      echangeDevise: EchangeDeviseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.echangeDevise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EchangeDeviseUpdateComponent,
    resolve: {
      echangeDevise: EchangeDeviseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.echangeDevise.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
