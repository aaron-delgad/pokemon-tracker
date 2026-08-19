import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'pokemon-list',
    pathMatch: 'full',
  },
  {
    path: 'pokemon-list',
    loadComponent: () => import('./features/pokemon-list/pokemon-list.page').then( m => m.PokemonListPage)
  },
  {
    path: 'pokemon-detail/:id',
    loadComponent: () => import('./features/pokemon-detail/pokemon-detail.page').then( m => m.PokemonDetailPage)
  },
];
