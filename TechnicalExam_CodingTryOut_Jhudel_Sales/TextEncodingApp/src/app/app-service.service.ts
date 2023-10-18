import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { Users } from './login/users.model';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  private baseUrl = 'http://localhost:5113/api/text/registerUser';
  constructor(private http: HttpClient) { }

  registerNewUser(username:string, password:any, balance:any, EmployeeType:any): Observable<any>
  {
    const url = this.baseUrl;
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'json' as 'json'
    }

    const newUser: Users = {
      FullName: username,
      BirthDate: password,
      Tin: balance,
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

}
