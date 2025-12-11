import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

/**
 * Tabs Routes Configuration
 * 
 * ROUTE STRUCTURE:
 * /login                    - Login page
 * /tabs/tab1                - Home/Explore listings
 * /tabs/tab2                - Tab 2
 * /tabs/tab3                - Tab 3
 * /tabs/new-listing         - Create new listing form
 * /tabs/listing/:id         - Dynamic listing detail (from Firestore)
 * /tabs/listings/listing1   - Static listing 1 (legacy)
 * /tabs/listings/listing2   - Static listing 2 (legacy)
 * /tabs/listings/listing3   - Static listing 3 (legacy)
 * /tabs/listings/listing4   - Static listing 4 (legacy)
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

      // New listing creation form
      {
        path: 'new-listing',
        loadComponent: () =>
          import('../new-listing/new-listing.page').then((m) => m.NewListingPage),
      },

      // Dynamic listing detail page (Firestore)
      {
        path: 'listing/:id',
        loadComponent: () =>
          import('../listing-detail/listing-detail.page').then((m) => m.ListingDetailPage),
      },

      // Legacy static listings (keep for backwards compatibility)
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
