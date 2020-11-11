import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ResponsePclave, ResponseProducts } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http:HttpClient, private router:Router) { }

  getProductos():Observable<ResponseProducts[]>{
    return this.http
    .get(`${environment.API_URL}/obtenerProductos`)
    .pipe(
      map((res:ResponseProducts[]) => {
        console.log(res);
        return res;
      })
    )
  }

  getPalabras():Observable<ResponsePclave[]>{
    return this.http
    .get(`${environment.API_URL}/obtenerPalabrasClave`)
    .pipe(
      map((res:ResponsePclave[]) => {
        console.log(res);
        return res;
      })
    )
  }

  getFilteredProducts(data):Observable<ResponseProducts[]>{
    return this.http
    .post(`${environment.API_URL}/obtenerProductos`,data)
    .pipe(
      map((res:ResponsePclave[]) => {
        console.log(res);
        return res;
      })
    )
  }
}
