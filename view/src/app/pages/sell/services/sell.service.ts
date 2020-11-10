import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellService {

  constructor(private http:HttpClient,private router:Router) { }

  addProducto(data: Product):Observable<boolean>{
    return this.http
    .post<boolean>(`${environment.API_URL}/nuevoProducto`,data)
    .pipe(
      map(res => {
        return res;
      })
    )
  }
}
