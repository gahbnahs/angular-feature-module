import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';

import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes:Routes = [
  {path:'employees',loadChildren: './employee/employee.module#EmployeeModule'},
  {path:'', redirectTo:'home',pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'**', component:PageNotFoundComponent},

];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports:[RouterModule]
})
export class AppRoutingModule { }
