import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria, SendCategoria } from '@app/shared/models/user.interface';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http:HttpClient, private router:Router) { }

  getCategorias():Observable<Categoria[]>{
    return this.http
    .get<Categoria[]>(`${environment.API_URL}/getCategorias`)
    .pipe(
      map((res:Categoria[]) => {
        console.log(res);
        return  res;
      })
    )
  }

  addCategory(data:SendCategoria):Observable<boolean>{
    console.log(data);
    
    return this.http
    .post<boolean>(`${environment.API_URL}/admin/addCategoria`,data)
    .pipe(
      map((res:boolean) => {
        return res;
      })
    )
  }
}
