import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full'},
  { 
    path: 'login', 
    loadComponent: () => import('./login/login.component').then(module=> module.LoginComponent)
  },
  { 
    path: '**', 
    loadComponent: () => import('./page-not-found/page-not-found.component').then(module => module.PageNotFoundComponent)
  },
];

@NgModule({
  imports: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
