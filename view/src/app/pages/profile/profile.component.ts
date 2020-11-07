import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from '../registro/paswordmatch';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  hide1 = true;
  hide2 = true;
  private emailRegex = /\S+@\S+\.\S+/;

  profileInfo = this.fb.group({
    email:['',[Validators.required, Validators.pattern(this.emailRegex)]],
    name:['',[Validators.required]],
    lastname:['',[Validators.required]],
    country:['',[Validators.required]],
    date:['',[Validators.required]]
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

  constructor(private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
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
}
