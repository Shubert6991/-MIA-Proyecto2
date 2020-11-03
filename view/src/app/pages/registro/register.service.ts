import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Pais } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
}
