import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDevise, Devise } from 'app/shared/model/devise.model';
import { DeviseService } from './devise.service';
import { DeviseComponent } from './devise.component';
import { DeviseDetailComponent } from './devise-detail.component';
import { DeviseUpdateComponent } from './devise-update.component';

@Injectable({ providedIn: 'root' })
export class DeviseResolve implements Resolve<IDevise> {
  constructor(private service: DeviseService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDevise> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((devise: HttpResponse<Devise>) => {
          if (devise.body) {
            return of(devise.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Devise());
  }
}

export const deviseRoute: Routes = [
  {
    path: '',
    component: DeviseComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.devise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: DeviseDetailComponent,
    resolve: {
      devise: DeviseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.devise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: DeviseUpdateComponent,
    resolve: {
      devise: DeviseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.devise.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: DeviseUpdateComponent,
    resolve: {
      devise: DeviseResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.devise.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
