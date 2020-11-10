import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria, SendCategoria } from '@app/shared/models/user.interface';
import { Subscription } from 'rxjs';
import { ServicioService } from './categorias/servicio.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})

export class AdminComponent implements OnInit,OnDestroy {

  ELEMENT_DATA: Categoria[] = [];

  displayedColumns: string[] = ['id','nombre'];
  dataSource = this.ELEMENT_DATA;

  categoryForm = this.fb.group({
    nombre:['',[Validators.required,Validators.minLength(2)]]
  })

  private subscriptions: Subscription = new Subscription();
  constructor(private fb: FormBuilder, private router:Router, private categorias:ServicioService) { }

  ngOnInit(): void {
   this.updateTable();
  }

  updateTable(){
    this.subscriptions.add(
      this.categorias.getCategorias().subscribe(res => {
        this.ELEMENT_DATA = res;
        this.dataSource = this.ELEMENT_DATA;
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  nuevaCategoria(): void {
    console.log("agregando categoria");
    var form = this.categoryForm.value;
    this.subscriptions.add(
      this.categorias.addCategory(form).subscribe(res => {
        if(res) this.updateTable();
      })
    )
  }

  isValidField(field:string):boolean{
    return(
      (this.categoryForm.get(field).touched || this.categoryForm.get(field).dirty) && 
      !(this.categoryForm.get(field).valid)
    )
  }
}
