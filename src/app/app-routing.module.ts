import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FivedayforecastComponent} from "./fivedayforecast/fivedayforecast.component";
import {SearchComponent} from "./search/search.component";

const routes: Routes = [
  {path: '',    component: SearchComponent},
  {path: 'search',  component: SearchComponent},
  {path: 'forecast/:zipcode', component: FivedayforecastComponent}
  ];
export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
