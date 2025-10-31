import { Routes } from '@angular/router';
import { Search } from "./search/search";
import { Fivedayforecast } from './fivedayforecast/fivedayforecast';


export const routes: Routes = [
    {path: '',    component: Search},
    {path: 'search',  component: Search},
    {path: 'forecast/:zipcode', component: Fivedayforecast}];
