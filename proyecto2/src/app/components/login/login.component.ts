import { Component, OnInit } from '@angular/core';
import { ConectionService } from '../../../services/conection.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public servicio:ConectionService) {

  }
  ngOnInit(): void {
    this.servicio.getUsers().subscribe((res) => {
      console.log(res);
    });
  }
}
