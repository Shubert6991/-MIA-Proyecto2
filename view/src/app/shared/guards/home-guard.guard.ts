import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/auth.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeGuardGuard implements CanActivate {

  constructor(private authSvc:AuthService,private router:Router) {}
  canActivate():Observable<boolean>{
    return this.authSvc.isLogged.pipe(
      take(1),
      map((isLogged: boolean) => {
        if(!isLogged) this.router.navigate(['login']);
        return isLogged
      })
    )
    
  }
  
}
