import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { imagePath, ProfilePic, RegistroResponse, User, userInfo, UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http:HttpClient, private router: Router) { }

  private user = new BehaviorSubject<User>(null);

  get theUser():Observable<User>{
    this.user.next(JSON.parse(localStorage.getItem('user')));
    return this.user.asObservable();
  }

  getPicture(picture: imagePath):Observable<ProfilePic>{    
    return this.http
    .post<ProfilePic>(`${environment.API_URL}/getPicture`, picture)
    .pipe(
      map((res:ProfilePic) => {
        return res;
      })
    )
  }

  updateInfo(data: userInfo):Observable<boolean>{
    return this.http
    .post<boolean>(`${environment.API_URL}/updateInfo`, data)
    .pipe(
      map((res:boolean) => {
        return res;
      })
    )
  }

  updatePass(data: User):Observable<boolean>{
    return this.http
    .post<boolean>(`${environment.API_URL}/changeUserPass`,data)
    .pipe(
      map((res:boolean)=>{
        return res;
      })
    )
  }

  updateProfilePicture(data: ProfilePic):Observable<RegistroResponse>{
    return this.http
    .post<UserResponse>(`${environment.API_URL}/changeUserPicture`,data)
    .pipe(
      map((res:UserResponse)=>{
        return res;
      })
    )
  }

}
