import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover',
  templateUrl: './recover.component.html',
  styleUrls: ['./recover.component.css']
})
export class RecoverComponent implements OnInit {

  recoverForm = this.fb.group({
    email:['']
  });

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {}

  isValidField(field:string):boolean {
    return (
      (this.recoverForm.get(field).touched || this.recoverForm.get(field).dirty) && !
      (this.recoverForm.get(field).valid)
    )
  }

  recover():void{
    
  }
}
