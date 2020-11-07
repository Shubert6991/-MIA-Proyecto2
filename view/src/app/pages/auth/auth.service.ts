import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse,Rol, UMail } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = new BehaviorSubject<boolean>(false);
  private role = new BehaviorSubject<Rol>(null);

  constructor(private http: HttpClient,private router: Router) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.logged.asObservable();
  }

  get isAdmin():Observable<number>{
    return this.role.asObservable();
  }

  login(authData: User):Observable<UserResponse|void>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/login`, authData)
    .pipe(
      map((res:UserResponse) => {
        if(res.mensaje === "Exito"){
          this.saveLocal(res);
          this.logged.next(true);
          this.role.next(res.tipo);
          return res;
        }else{
          window.alert("Usuario o contraseña incorrectos");
        }
      }),
      catchError((err) => this.handleError(err))
    );
  }

  logout():void{
    localStorage.removeItem('user');
    this.logged.next(false);
    this.role.next(null);
    this.router.navigate(['login']);
  }

  private checkToken():void{
    const user = JSON.parse(localStorage.getItem('user')) || null;
    if(user){
      const isExpired = helper.isTokenExpired(user.token);
      if(isExpired){
        this.logout()
      } else{
        this.logged.next(true);
        this.role.next(user.tipo);
      }
    }
  }

  private saveLocal(user:UserResponse):void{
    const {mensaje,...rest} = user;
    localStorage.setItem('user',JSON.stringify(rest));
  }

  private handleError(err:any):Observable<never>{
    let errorMessage = "Ocurrio un error al tratar de obtener datos";
    if(err){
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  recoverPass(recoverData:UMail):Observable<boolean>{
   return this.http
   .post<boolean>(`${environment.API_URL}/recoverPass`, recoverData)
   .pipe(
     map((res:boolean) => {
       return res;
     })
   );
  }

  changePass(data:User):Observable<boolean>{
    return this.http
    .post<boolean>(`${environment.API_URL}/changePass`,data)
    .pipe(
      map((res:boolean) => {
        return res;
      })
    );
  }
}
