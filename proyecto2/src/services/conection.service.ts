import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConectionService {

  constructor(private http:HttpClient) { }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type":"application/json"
  });

  //getUsers
  getUsers() {
    const url = 'http://localhost:4000/getUsuarios';
    return this.http.get(url);
  }
}
