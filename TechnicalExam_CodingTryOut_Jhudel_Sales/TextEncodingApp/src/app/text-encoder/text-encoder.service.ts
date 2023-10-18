import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

import { Employees } from './employees.model';

@Injectable({
  providedIn: 'root'
})

export class TextEncoderService {
  private baseUrlGetListOfEmployee = 'http://localhost:5113/api/text/getListOfEmployees';
  private baseUrlEditEmployees = 'http://localhost:5113/api/text/EditEmployees';
  private baseUrlDeleteEmployee = 'http://localhost:5113/api/text/DeleteEmployee';

  constructor(private http: HttpClient) { }

  getListOfEmployees() : Observable <any> {
    const url = this.baseUrlGetListOfEmployee;
   
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'json' as 'json'
    }

    return this.http.get<any>(url, options).pipe(
      catchError(error => {
        console.error("error in get method");
        throw error;
      })
    );
  }

  EditEmployees(EmployeeId:any,FullName:any, BirthDate:any, Tin:any, EmployeeType:any) : Observable<any>
  {
    const url = this.baseUrlEditEmployees;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'json' as 'json'
    }

    const newUser: Employees = {
      EmployeeId: EmployeeId,
      FullName: FullName,
      BirthDate: BirthDate,
      Tin:Tin,
      EmployeeType:EmployeeType
    };

    return this.http.post<any>(url, newUser, options).pipe(
      catchError(error => {
        console.log('error');
        throw error;
      }),
      catchError(() => new Observable<any>)
    );
  }

  DeleteEmployees(Id:any) : Observable<any>
  {
    let params = new HttpParams();
    params = params.set('EmployeeId', Id);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      params: params,
    };
    return this.http.put<any>(this.baseUrlDeleteEmployee, null, options);
  }
}
