import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private logged = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { 
    this.checkToken();
  }

  get isLogged():Observable<boolean>{
    return this.logged.asObservable();
  }

  login(authData: User):Observable<UserResponse|void>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/login`, authData)
    .pipe(
      map((res:UserResponse) => {
        if(res.mensaje  === "Exito"){
          this.saveToken(res.token);
          this.logged.next(true);
        } else {
          //usuario o contraseña erroneos
        }
      }),
      catchError((err) => this.handleError(err))
    );
  }

  logout():void{
    localStorage.removeItem('token');
    this.logged.next(false);
  }

  private checkToken():void{
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log("Token expirado?: "+isExpired);
    isExpired ? this.logout() : this.logged.next(true);
  }

  private saveToken(token:string):void{
    localStorage.setItem('token',token);
  }

  private handleError(err:any):Observable<never>{
    let errorMessage = "Ocurrio un error al tratar de obtener datos";
    if(err){
      errorMessage = `Error: ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
