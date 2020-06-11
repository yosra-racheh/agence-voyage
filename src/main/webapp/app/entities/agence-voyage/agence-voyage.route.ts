import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAgenceVoyage, AgenceVoyage } from 'app/shared/model/agence-voyage.model';
import { AgenceVoyageService } from './agence-voyage.service';
import { AgenceVoyageComponent } from './agence-voyage.component';
import { AgenceVoyageDetailComponent } from './agence-voyage-detail.component';
import { AgenceVoyageUpdateComponent } from './agence-voyage-update.component';

@Injectable({ providedIn: 'root' })
export class AgenceVoyageResolve implements Resolve<IAgenceVoyage> {
  constructor(private service: AgenceVoyageService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgenceVoyage> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((agenceVoyage: HttpResponse<AgenceVoyage>) => {
          if (agenceVoyage.body) {
            return of(agenceVoyage.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgenceVoyage());
  }
}

export const agenceVoyageRoute: Routes = [
  {
    path: '',
    component: AgenceVoyageComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.agenceVoyage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: AgenceVoyageDetailComponent,
    resolve: {
      agenceVoyage: AgenceVoyageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.agenceVoyage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: AgenceVoyageUpdateComponent,
    resolve: {
      agenceVoyage: AgenceVoyageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.agenceVoyage.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: AgenceVoyageUpdateComponent,
    resolve: {
      agenceVoyage: AgenceVoyageResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'wegaTravelPartnerManagerApp.agenceVoyage.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
