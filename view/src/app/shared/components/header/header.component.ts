import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/pages/auth/auth.service';
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

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.subscription.add(
      this.authSvc.isLogged.subscribe((res) => this.isLogged = res)
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
  }

  goToProfile():void {
    this.router.navigate(['profile']);
  }
}
