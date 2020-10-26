import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authSvc: AuthService) { }

  ngOnInit(): void {
    const userData = {
      username: "test@test.com",
      password: "123456",
    };
    this.authSvc.login(userData).subscribe((rest) => console.log("login"));
  }

}
