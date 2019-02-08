import { NgModule } from '@angular/core';
import {SharedModule} from '../shared/shared.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeeRoutingModule } from './employee-routing.module';


@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent
  ],
  imports: [
    SharedModule,
    EmployeeRoutingModule,
    
  ]
})
export class EmployeeModule { }
