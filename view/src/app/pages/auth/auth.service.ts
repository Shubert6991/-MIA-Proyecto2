import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable, throwError } from 'rxjs';
import { catchError,map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authData: User):Observable<UserResponse|void>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/login`, authData)
    .pipe(
      map((res:UserResponse) => {
        console.log(res);
        //save User Token
        this.saveToken(res.token);
      }),
      catchError( (err) => this.handleError(err))
    );
  }

  logout():void{}
  private readToken():void{}
  private saveToken(token:string):void{}

  private handleError(err:any):Observable<never>{
    let errorMessage = "Ocurrio un error al tratar de obtener datos";
    if(err){
      errorMessage = `Error: ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
