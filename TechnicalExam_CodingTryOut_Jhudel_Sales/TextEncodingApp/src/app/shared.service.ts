import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  userData: any; // This variable will hold the user data
  private buttonClickSubject = new Subject<void>();


  constructor() {}


  public notifyButtonClick(): void {
    this.buttonClickSubject.next();
  }

  public onButtonClick(): Observable<void> {
    return this.buttonClickSubject.asObservable();
  }
}
