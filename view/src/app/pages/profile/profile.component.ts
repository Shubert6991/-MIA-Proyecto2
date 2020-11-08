import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MustMatch } from '../registro/paswordmatch';
import { RegisterService } from '../registro/register.service';
import { ProfileService } from './servicio/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit,OnDestroy {
  User = null;
  Countries = null;
  hide1 = true;
  hide2 = true;
  Image = "";
  imageEncoded;
  private emailRegex = /\S+@\S+\.\S+/;
  private subscription: Subscription = new Subscription();

  profileInfo = this.fb.group({
    email:['',[Validators.required, Validators.pattern(this.emailRegex)]],
    name:['',[Validators.required]],
    lastname:['',[Validators.required]],
    country:['',[Validators.required]],
    date:['',[Validators.required]],
    credits:['']
  });

  profilePass = this.fb.group({
    pass:['',[Validators.required,Validators.minLength(5)]],
    pass1:['',[Validators.required,Validators.minLength(5)]],
    pass2:['',[Validators.required]]
  },
  {
    validator: MustMatch('pass1','pass2')
  });

  profilePic = this.fb.group({
    picture:['',[Validators.required]]
  });

  constructor(private fb: FormBuilder, private router:Router,private registerService:RegisterService,private profileService: ProfileService) { }

  ngOnInit(): void {
    //informacion de usuario
    this.User = JSON.parse(localStorage.getItem('user')) || null;
    // console.log(this.User);

    //llenar formularios
    this.subscription.add(
      this.registerService.getPaises().subscribe(res => {
        this.Countries = res;
      })
    );
    this.profileInfo.setValue({
      email: this.User.correo,
      name: this.User.nombre,
      lastname: this.User.apellido,
      country: this.User.idPais,
      date: new Date(this.User.nacimiento),
      credits: this.User.credits
    });
    this.profilePass.setValue({
      pass: "contrasenauser",
      pass1: "",
      pass2: ""
    })

    //obtener imagen
    let infoPath = {"path":this.User.pathProfilePic}
    this.subscription.add(
      this.profileService.getPicture(infoPath).subscribe(res =>{
        // console.log(res)
        this.Image = res.image;
      })
    )
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isValidProfileInfo(field:string):boolean{
    return(
      (this.profileInfo.get(field).touched || this.profileInfo.get(field).dirty) && 
      !(this.profileInfo.get(field).valid)
    )
  }

  isValidProfilePass(field:string):boolean{
    return(
      (this.profilePass.get(field).touched || this.profilePass.get(field).dirty) && 
      !(this.profilePass.get(field).valid)
    )
  }

  isValidProfilePic(field:string):boolean{
    return(
      (this.profilePic.get(field).touched || this.profilePic.get(field).dirty) && 
      !(this.profilePic.get(field).valid)
    )
  }

  //actuarlizar informacion del usuario
  updateInfo():void{
    var fuinf = this.profileInfo.value;
    var fecha = fuinf.date.getDate()+"/"+(+fuinf.date.getMonth()+1)+"/"+fuinf.date.getFullYear();
    var uinf = {
      uid: this.User.userId,
      name: fuinf.name,
      lastname: fuinf.lastname,
      country: fuinf.country,
      date: fecha
    }

    this.User.nombre = uinf.name;
    this.User.apellido = uinf.lastname;
    this.User.idPais = uinf.country;
    this.User.nacimiento = uinf.date;

    this.subscription.add(
      this.profileService.updateInfo(uinf).subscribe(res => {
        console.log(res);
        localStorage.setItem('user',JSON.stringify(this.User));
      })
    )
  }

  //cambiar contraseña
  changePass():void{
    var fupass = this.profilePass.value;
    var email = this.User.correo;
    var objUsr = {
      username: email,
      password: fupass.pass1
    }
    this.subscription.add(
      this.profileService.updatePass(objUsr).subscribe(res => {
        window.alert("Contraseña actualizada exitosamente")
      })
    );
  }

  //cambiar foto de perfil
  changeImage():void{
    //create object
    var objPP = {
      uid: this.User.userId,
      email: this.User.correo,
      image: this.imageEncoded
    }
    //update database
    this.subscription.add(
      this.profileService.updateProfilePicture(objPP).subscribe(res => {
        this.User.pathProfilePic = res.mensaje;
        localStorage.setItem('user',JSON.stringify(this.User));
        // location.reload();
        let infoPath = {"path":this.User.pathProfilePic}
        this.subscription.add(
          this.profileService.getPicture(infoPath).subscribe(res =>{
            this.Image = res.image;
          })
        )
      })
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
