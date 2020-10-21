import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router) {}

  ngOnInit():void{
    if(this.nombreUsr){
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['login']);
    }
  }

  title = 'proyecto 2';
  nombreUsr = '';

  updateNombre(nombre: string) {
    if (nombre) {
      this.nombreUsr = nombre;
    }
  }

  
}
