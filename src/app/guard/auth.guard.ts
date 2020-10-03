import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization-service/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router,private authorizationService: AuthorizationService){

  }
  public canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : boolean{
   // const expectedRoles : [any] = route.data.expectedRoles;
    //console.log("Recieved expectedRole in canActivate " + expectedRole);
    if(this.authorizationService.isLogedIn()){
        // let loggedInUserRole = this.authorizationService.getLoggedInUserRole();
        // let matchedRole = expectedRoles.find(role => role === loggedInUserRole);
        return true;
        
    }else{
      this.router.navigate(['/login']);
    return false;
}
   
}

public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    //console.log("canActivateChild methhod running");
    //console.log("Calling canActivate");
    return this.canActivate(childRoute,state);
}
  
}
