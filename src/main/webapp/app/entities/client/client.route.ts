import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Client, IClient } from 'app/shared/model/client.model';
import { ClientService } from './client.service';
import { ClientComponent } from './client.component';
import { ClientPopupComponent } from './client-dialog.component';

@Injectable({ providedIn: 'root' })
export class ClientResolve implements Resolve<IClient> {
  constructor(private service: ClientService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IClient> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Client>) => response.ok),
        map((client: HttpResponse<Client>) => client.body)
      );
    }
    return of(new Client());
  }
}

export const clientRoute: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'clientsWebApp.client.home.title'
    },
    canActivate: []
  }
];

export const clientPopupRoute: Routes = [
  {
    path: 'new',
    component: ClientPopupComponent,
    resolve: {
      client: ClientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'clientsWebApp.client.home.title'
    },
    canActivate: [],
    outlet: 'popup'
  },
  {
    path: ':id/edit',
    component: ClientPopupComponent,
    resolve: {
      client: ClientResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'clientsWebApp.client.home.title'
    },
    canActivate: [],
    outlet: 'popup'
  }
];
