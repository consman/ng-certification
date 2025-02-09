import { Routes } from '@angular/router';
import { SearchComponent } from "./search/search.component";
import { FivedayforecastComponent } from './fivedayforecast/fivedayforecast.component';

export const routes: Routes = [
    {path: '',    component: SearchComponent},
    {path: 'search',  component: SearchComponent},
    {path: 'forecast/:zipcode', component: FivedayforecastComponent}
];
