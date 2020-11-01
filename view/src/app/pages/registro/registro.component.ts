import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { AuthService } from '@auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registerForm = this.fb.group({
    nombre:[''],
  });
  constructor(private authSvc: AuthService, private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

}
