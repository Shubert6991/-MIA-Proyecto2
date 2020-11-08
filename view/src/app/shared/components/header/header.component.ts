import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/auth.service';
import { ProfileService } from '@app/pages/profile/servicio/profile.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();
  isAdmin = null;
  isLogged = false;
  User = null;
  profilePicture = "";

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc:AuthService, private router:Router,private profileService: ProfileService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authSvc.isLogged.subscribe((res) => {
        this.isLogged = res;

        if(res){
          this.User = JSON.parse(localStorage.getItem('user'));
          
          var path = this.User.pathProfilePic;
          let infoPath = { "path": path}
          this.subscription.add(
            this.profileService.getPicture(infoPath).subscribe(res =>{
              this.profilePicture = res.image;
            })
          )
        }
      })
    );

    this.subscription.add(
      this.authSvc.isAdmin.subscribe((res) => this.isAdmin = res)
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onToggleSidenav(){
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authSvc.logout();
    // this.profilePicture = "";
  }
}
