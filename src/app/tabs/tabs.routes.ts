import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../login/login/login.page').then((m) => m.LoginPage),
  },
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },

      // routes for listings so tab1 buttons work
      {
        path: 'listings',
        children: [
          {
            path: 'listing1',
            loadComponent: () =>
              import('../Listings/listing1/listing1.page').then((m) => m.Listing1Page),
          },
          {
            path: 'listing2',
            loadComponent: () =>
              import('../Listings/listing2/listing2.page').then((m) => m.Listing2Page),
          },
          {
            path: 'listing3',
            loadComponent: () =>
              import('../Listings/listing3/listing3.page').then((m) => m.Listing3Page),
          },
          {
            path: 'listing4',
            loadComponent: () =>
              import('../Listings/listing4/listing4/listing4.page').then((m) => m.Listing4Page),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
];
