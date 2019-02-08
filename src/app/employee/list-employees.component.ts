import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {IEmployee} from './iemployee';
import {EmployeeService}  from './employee.service'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {
 
  employees:IEmployee[];
  

  getEmployees():void{
   this.empService.getEmployees().subscribe(empList=>this.employees = empList,
    (err) => console.log(err));
  }

  editEmployee(id:number):void{
    this.router.navigate(['/employees/edit', id]);
  }
  ngOnInit() {
    this.getEmployees();
  }
  constructor(private empService:EmployeeService,private router:Router) { }

}
