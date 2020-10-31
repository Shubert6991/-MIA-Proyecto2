import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '@auth/auth.service';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit,OnDestroy {
  private emailRegex = /\S+@\S+\.\S+/;
  private subscription: Subscription = new Subscription();
  hide = true;
  
  loginForm = this.fb.group({
    username:['',[Validators.required, Validators.pattern(this.emailRegex)]],
    password:['',[Validators.required, Validators.minLength(5)]], 
  });

  constructor(private authSvc: AuthService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {}

  ngOnDestroy():void {
    this.subscription.unsubscribe();
  }

  onLogin():void{
    if(this.loginForm.invalid){
      return;
    }
    const formValue = this.loginForm.value;
    this.subscription.add(
      this.authSvc.login(formValue).subscribe((res) =>{
        if(res){
          this.router.navigate(['']);
        }
      })
    );
  }

  getErrorMessage(field:string):string{
    let message;
    if(this.loginForm.get(field).errors.required){
      message = 'Debes ingresar un valor valido';
    } else if(this.loginForm.get(field).hasError('pattern')){
      message = 'Debes ingresar un email valido';
    } else if(this.loginForm.get(field).hasError('minlength')){
      message = 'La contraseña debe ser mayor a 5 caracteres';
    }
    return message
  }

  isValidField(field:string):boolean {
    return (
      (this.loginForm.get(field).touched || this.loginForm.get(field).dirty) && !
      (this.loginForm.get(field).valid)
    )
  }
  
  registro():void{
    this.router.navigate(['registro']);
  }
}
