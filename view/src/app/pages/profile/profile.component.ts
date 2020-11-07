import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hide1 = true;
  hide2 = true;

  profileInfo = this.fb.group({
    email:[''],
    name:[''],
    lastname:[''],
    country:[''],
    date:['']
  })

  profilePass = this.fb.group({
    pass:[''],
    pass1:[''],
    pass2:['']
  })

  profilePic = this.fb.group({
    picture:['']
  })
  constructor(private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

}
