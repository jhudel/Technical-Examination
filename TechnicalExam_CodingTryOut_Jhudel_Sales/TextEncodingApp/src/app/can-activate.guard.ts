import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from './shared.service'; // Import the shared service

@Injectable({
  providedIn: 'root',
})
export class CanActivateGuard implements CanActivate {
  constructor(
    private sharedService: SharedService, // Inject the shared service
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Check if user data exists
    if (this.sharedService.userData == true) {
      console.log("dwad");
      return true;
    }

    // If user data does not exist, redirect to login
    this.router.navigate(['/login']);
    return false;
  }
}
