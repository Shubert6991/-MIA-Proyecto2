import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  productForm = this.fb.group({
    nombre: [''],
    descripcion: [''],
    pclaves: [''],
    precio: [''],
    categoria: [''],
  })
  constructor(private fb: FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

  isValidField(field:string):boolean{
    return(
      (this.productForm.get(field).touched || this.productForm.get(field).dirty) && 
      !(this.productForm.get(field).valid)
    )
  }
}
