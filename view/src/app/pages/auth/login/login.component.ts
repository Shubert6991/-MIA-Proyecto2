import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    username:[''],
    password:[''],
  });

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
    // const userData = {
    //   username: "test@test.com",
    //   password: "123456",
    // };
    // this.authSvc.login(userData).subscribe((rest) => console.log("login"));
  }

  onLogin():void{
    const formValue = this.loginForm.value;
    this.authSvc.login(formValue).subscribe((res)=>{
      if(res){
        this.router.navigate(['']);
      }
    })
  }
}
