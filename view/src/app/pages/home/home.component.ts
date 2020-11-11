import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ServicioService } from '../admin/categorias/servicio.service';
import { AuthService } from '../auth/auth.service';
import { ProductosService } from './services/productos.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {
  User = null;

  searchForm = this.fb.group({
    categoria:[''],
    precio:[''],
    clave:['']
  })
  
  private subscription: Subscription = new Subscription();

  categories;
  pClaves;
  filteredOptions: Observable<string[]>;
  allProductos;

  constructor(private authSvc:AuthService,private fb:FormBuilder, private catSvc:ServicioService, private productsSvc:ProductosService) { }

  ngOnInit(): void {
    //user info
    this.User = JSON.parse(localStorage.getItem('user')) || null;
    //categories
    this.subscription.add(
      this.catSvc.getCategorias().subscribe(res => {
        this.categories = res;
      })
    )
    //palabras clave
    this.subscription.add(
      this.productsSvc.getPalabras().subscribe(res => {
        this.pClaves = res;
      })
    )
    //productos
    this.subscription.add(
      this.productsSvc.getProductos().subscribe(res => {
        this.allProductos = res;
      })
    )
  }
  
  ngOnDestroy():void{
    this.subscription.unsubscribe();
  }

  buscarProductos():void {
    this.subscription.add(
      this.productsSvc.getFilteredProducts(this.searchForm.value).subscribe(res => {
        this.allProductos = res;
      })
    )
  }

}
