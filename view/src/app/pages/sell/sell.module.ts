import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SellRoutingModule } from './sell-routing.module';
import { SellComponent } from './sell.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [SellComponent],
  imports: [
    CommonModule,
    SellRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class SellModule { }
