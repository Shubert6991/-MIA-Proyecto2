import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit,OnDestroy {
  private emailRegex = /\S+@\S+\.\S+/;
  private subscription: Subscription = new Subscription();

  recoverForm = this.fb.group({
    email:['',[Validators.required, Validators.pattern(this.emailRegex)]]
  });

  constructor(private fb: FormBuilder, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isValidField(field:string):boolean {
    return (
      (this.recoverForm.get(field).touched || this.recoverForm.get(field).dirty) && !
      (this.recoverForm.get(field).valid)
    )
  }

  getErrorMessage(field:string):string{
    let message = 'Debes ingresar un email valido';
    return message
  }


  recover():void{
    if(this.recoverForm.invalid) return;
    const value = this.recoverForm.value;
    value.email = value.email.trim();
    let email64 = btoa(value.email);
    value.email = email64;

    this.subscription.add(
      this.authSvc.recoverPass(value).subscribe((res) => {
        window.alert("Correo enviado exitosamente, revise su bandeja de entrada.")
        this.router.navigate(['login'])
      })
    );

  }
}
