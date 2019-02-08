import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Observable,throwError  } from 'rxjs';
import {tap,catchError} from 'rxjs/operators'

import { IEmployee } from './iemployee';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseURL ='http://localhost:3000/employees';

   getEmployees():Observable<IEmployee[]>{

    return this.http.get<IEmployee[]>(this.baseURL).pipe(
      tap((data)=>{ this.log('fetched employees: '+  data.length)}),
      catchError(this.handleError)
    )
   };

   getEmployee(id:number):Observable<IEmployee>{
    const url =`${this.baseURL}/${id}`;
    //console.log(url);
    return this.http.get<IEmployee>(url).pipe(
      tap((data)=>{ this.log(`fetched employee with id=${id}`)}),
      catchError(this.handleError)
    )
   };

   updateEmployee(employee:IEmployee):Observable<IEmployee>{
    const url =`${this.baseURL}/${employee.id}`;
     return this.http.put<IEmployee>(url,employee,httpOptions).pipe(
       tap(()=>{this.log(`updated employee with id=${employee.id}`)}),
       catchError(this.handleError)
     )
   }

   addEmployee(employee:IEmployee):Observable<IEmployee>{
     return this.http.post<IEmployee>(this.baseURL,employee,httpOptions).pipe(
       tap((data:IEmployee)=>{this.log(`added employee and id is ${data.id}`)}),
       catchError(this.handleError)
     )
   }

  private log(message:string):void{
    console.log('log is :'+message);
  }
   private handleError(errorResponse: HttpErrorResponse) {

    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } else {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}


  constructor(private http:HttpClient) { }
}
