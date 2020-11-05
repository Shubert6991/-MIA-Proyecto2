import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pais, RegistroResponse, RegistroUsuario } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClient,private router:Router) { }

  getPaises():Observable<Pais>{
    return this.http
    .get(`${environment.API_URL}/getPaises`)
    .pipe(
      map((res:Pais) => {
        return res;
      })
    );
  }

  registro(data:RegistroUsuario):Observable<string>{
    return this.http
    .post(`${environment.API_URL}/registro`,data)
    .pipe(
      map((res:RegistroResponse) => {
        return res.mensaje;
      })
    );
  }
}
