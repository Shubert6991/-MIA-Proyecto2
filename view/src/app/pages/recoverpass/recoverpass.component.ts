import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { MustMatch } from '../registro/paswordmatch';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.css']
})
export class RecoverpassComponent implements OnInit,OnDestroy {
  private subscription: Subscription = new Subscription();

  hide1 = true;
  hide2 = true;
  Email = "";

  recoverForm = this.fb.group({
    email:['',[Validators.required]],
    pass1:['',[Validators.required,Validators.minLength(5)]],
    pass2:['',[Validators.required]]
  },
  {
    validator: MustMatch('pass1','pass2')
  }
  );

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private router: Router, private authSvc: AuthService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.params.subscribe(params => {
        console.log('The id of this route is: ', params.id);
        this.Email = atob(params.id);
      })
    );
    this.recoverForm.setValue({
      email: this.Email,
      pass1: "",
      pass2: ""
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isValidField(field:string):boolean {
    return (
      (this.recoverForm.get(field).touched || this.recoverForm.get(field).dirty) && !
      (this.recoverForm.get(field).valid)
    )
  }

  recover():void{
    //enviar datos a api
    const {pass2,...rest} = this.recoverForm.value;
    this.subscription.add(
      this.authSvc.changePass(rest).subscribe((res) => {
        window.alert("Contraseña actualizada exitosamente")
        this.router.navigate(['login'])
      })
    );
  }
}
