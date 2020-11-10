import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { isRegExp } from 'util';
import { ServicioService } from '../admin/categorias/servicio.service';
import { SellService } from './services/sell.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit,OnDestroy {

  private subscription: Subscription = new Subscription();
  private pclaveRegex = /\w+(,\w+)*/;

  productForm = this.fb.group({
    nombre: ['',[Validators.required]],
    descripcion: ['',[Validators.required]],
    pclaves: ['',[Validators.required,Validators.pattern(this.pclaveRegex)]],
    precio: ['',[Validators.required]],
    cantidad: ['',[Validators.required]],
    categoria: ['',[Validators.required]],
    picture:['']
  })

  Cats;
  imageEncoded;
  User;
  constructor(private fb: FormBuilder, private router:Router,private categorias:ServicioService,private produtosSvc: SellService) { }

  ngOnInit(): void {
    this.User = JSON.parse(localStorage.getItem('user')) || null;
    this.subscription.add(
      this.categorias.getCategorias().subscribe(res => {
        this.Cats = res;
      })
    )
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

  isValidField(field:string):boolean{
    if(field === 'cantidad' && this.productForm.get(field).touched){
      if(this.productForm.get(field).value < 1) this.productForm.get(field).setValue(1);
    }
    return(
      (this.productForm.get(field).touched || this.productForm.get(field).dirty) && 
      !(this.productForm.get(field).valid)
    )
  }

  handleUpload(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        this.imageEncoded = reader.result;
    };
  }

  venderProducto(): void{
    let form = this.productForm.value;
    let producto = {
      nombre: form.nombre,
      description: form.descripcion,
      claves: form.pclaves,
      precio: form.precio,
      cantidad: form.cantidad,
      categoria: form.categoria,
      picture: this.imageEncoded,
      idUsuario: this.User.userId,
      correo: this.User.correo,
      pais: this.User.idPais
    }
    this.subscription.add(
      this.produtosSvc.addProducto(producto).subscribe(res => {
        console.log(res);
        if(res){
          window.alert("Producto Publicado correctamente");
          this.router.navigate(['']);
        } else {
          window.alert("Hubo un error al tratar de comunicarse con el servidor, intente nuevamente");
        }
      })
    )
  }
}
