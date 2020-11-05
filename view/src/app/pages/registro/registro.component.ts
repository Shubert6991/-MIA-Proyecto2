import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RegisterService } from './register.service';
import { MustMatch } from './paswordmatch';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit,OnDestroy {
  private emailRegex = /\S+@\S+\.\S+/;

  registerForm = this.fb.group({
    name:['',[Validators.required, Validators.minLength(1)]],
    lastname:['',[Validators.required, Validators.minLength(1)]],
    email:['',[Validators.required,Validators.pattern(this.emailRegex)]],
    password:['',[Validators.required,Validators.minLength(5)]],
    password2:['',[Validators.required]],
    date:['',[Validators.required]],
    country:['',[Validators.required]],
    picture:['']
  },{
    validator: MustMatch('password','password2')
  });

  countries;
  imageEncoded;
  
  constructor(private registerService:RegisterService, private fb: FormBuilder, private router:Router) { }
  private subscription: Subscription = new Subscription();

  ngOnInit(): void {
    //obtener lista de paises
    this.subscription.add(
      this.registerService.getPaises().subscribe(res => {
        this.countries = res;
      })
    );
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  onRegister():void{
    const {password2,...rest} = this.registerForm.value;
    rest.picture = this.imageEncoded;
    var fecha = rest.date.getDate()+"/"+(+rest.date.getMonth()+1)+"/"+rest.date.getFullYear();
    rest.date = fecha;
    rest.email = rest.email.trim();
    this.subscription.add(
      this.registerService.registro(rest).subscribe(res =>{
        switch(res){
          case "OK":
            this.router.navigate(['login']);
            break;
          case "ERROR, AL SUBIR FOTO":
            window.alert("Error al subir foto, verifique que sea un archivo valido");
            break;
          case "ERROR, USUARIO YA EXISTE":
            window.alert("Ya existe un usuario con ese correo, olvido la contraseña?");
            break;
        }
      })
    );
  }

  isValidField(field:string):boolean{
    if(field === 'password2') {
      return !(this.registerForm.get(field).value === this.registerForm.get('password').value)
    }
    return(
      (this.registerForm.get(field).touched || this.registerForm.get(field).dirty) && 
      !(this.registerForm.get(field).valid)
    )
  }

  handleUpload(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.imageEncoded = reader.result;
    };
  }
}
