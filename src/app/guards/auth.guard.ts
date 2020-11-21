import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private authService: AuthService, private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) : Observable<boolean> | boolean{
        
        if(this.authService.getUserId()) {
            return true;
        } else {
            this.router.navigate(['/login'], {
                queryParams: {
                  return: state.url
                }
            });
            return false;  
        }
        
    }
}