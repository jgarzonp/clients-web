import { Routes } from '@angular/router';

import { ErrorComponent } from 'app/layouts';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title'
    }
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'error.title',
      error404: true
    }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
