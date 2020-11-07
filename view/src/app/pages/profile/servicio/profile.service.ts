import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { imagePath, ProfilePic } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient, private router: Router) { }

  getPicture(picture: imagePath):Observable<ProfilePic>{
    console.log(picture);
    
    return this.http
    .post<ProfilePic>(`${environment.API_URL}/getPicture`, picture)
    .pipe(
      map((res:ProfilePic) => {
        return res;
      })
    )
  }
}
