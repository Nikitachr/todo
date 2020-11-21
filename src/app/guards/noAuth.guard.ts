import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from '../services/auth.service';
 
export class NotAuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : Observable<boolean> | boolean{
        
        if(!this.authService.getUserId()) {
            return true;
        } else {
            this.router.navigate(['/login'], {
            });
            return false;  
        }
    }
}