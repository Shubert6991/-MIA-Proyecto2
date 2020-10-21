import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../../services/conection.service';
import { Router } from '@angular/router';

import forge from 'node-forge';

let usuarios;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public servicio:ConectionService,private router: Router) {}
  
  ngOnInit(): void {
    this.servicio.getUsers().subscribe((res) => {
      usuarios = res;
    });
  }

  pass: string;
  email: string;

  ingresar(){
    let alertEmail = document.getElementById('invalidEmail');
    let alertPass = document.getElementById('invalidPass');
    let alertInfo = document.getElementById('invalidInfo');

    if(!alertEmail.hasAttribute("hidden")) alertEmail.setAttribute("hidden","");
    if(!alertPass.hasAttribute("hidden")) alertPass.setAttribute("hidden","");
    if(!alertInfo.hasAttribute("hidden")) alertInfo.setAttribute("hidden","");
    //validar datos
    if(!this.pass){
      alertPass.attributes.removeNamedItem("hidden");
    } 
    if(!this.email){
      alertEmail.attributes.removeNamedItem("hidden");
    }
    
    var md = forge.md.sha256.create();  
    md.start();  
    md.update("admin", "utf8");  
    var passEncrypted = md.digest().toHex();  
    console.log(passEncrypted);
    
    usuarios.forEach(usr => {
      console.log(usr)
      if(usr.correo === this.email){
        console.log("este es");
        if(usr.pass == passEncrypted){
          console.log("contra tambien esta bien")
          //redireccionar a home
          this.router.navigate(['/']);
        }
        return;
      }
    });
    alertInfo.attributes.removeNamedItem("hidden");
  }

  registrarse(){
    //redireccionar a componente de registro
  }
}
