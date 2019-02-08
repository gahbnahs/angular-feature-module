import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListEmployeesComponent } from './list-employees.component';
import { CreateEmployeeComponent } from './create-employee.component';

const empRoutes:Routes=[
 
 {path:'',component:ListEmployeesComponent},
 {path:'create',component:CreateEmployeeComponent},
 {path:'edit/:id',component:CreateEmployeeComponent},
  

]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(empRoutes)
  ],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
