import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  User = null;

  searchForm = this.fb.group({
    categoria:[''],
    precio:[''],
    palabraClave:['']
  })

  constructor(private authSvc:AuthService,private fb:FormBuilder) { }

  ngOnInit(): void {
    this.User = JSON.parse(localStorage.getItem('user')) || null;
  }

}
