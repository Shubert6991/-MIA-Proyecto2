import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '@app/pages/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAdmin = false;
  isLogged = false;

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authSvc:AuthService) { }

  ngOnInit(): void {
    this.authSvc.isLogged.subscribe(res => this.isLogged = res)
  }

  onToggleSidenav(){
    this.toggleSidenav.emit();
  }

  onLogout():void{
    this.authSvc.logout();
  }
}
