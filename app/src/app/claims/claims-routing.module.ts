import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { ClaimsComponent } from './claims.component';

const routes: Routes = [
  Route.withShell([
    { path: 'claims', component: ClaimsComponent, data: { title: extract('Claims') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ClaimsRoutingModule { }
