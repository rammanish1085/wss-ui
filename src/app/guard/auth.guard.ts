import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization-service/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  otp: string = "FAIL";

  constructor(private router: Router, private authorizationService: AuthorizationService) {

  }
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    this.otp = localStorage.getItem("key");

    if (this.authorizationService.isLogedIn() && this.otp === "SUCCESS") {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }

  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        return this.canActivate(childRoute, state);
  }

}
