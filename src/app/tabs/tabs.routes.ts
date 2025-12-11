import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

/**
 * Tabs Routes Configuration
 * 
 * ROUTE STRUCTURE:
 * /login                    - Login page
 * /tabs/tab1                - Home/Explore listings
 * /tabs/tab2                - Tab 2
 * /tabs/tab3                - Settings
 * /tabs/new-listing         - Create new listing form
 * /tabs/listing/:id         - Dynamic listing detail (from Firestore)
 */
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
      {
        path: 'new-listing',
        loadComponent: () =>
          import('../new-listing/new-listing.page').then((m) => m.NewListingPage),
      },
      {
        path: 'listing/:id',
        loadComponent: () =>
          import('../listing-detail/listing-detail.page').then((m) => m.ListingDetailPage),
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
