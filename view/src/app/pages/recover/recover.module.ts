import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverRoutingModule } from './recover-routing.module';
import { RecoverComponent } from './recover.component';
import { MaterialModule } from '@app/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [RecoverComponent],
  imports: [
    CommonModule,
    RecoverRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class RecoverModule { }
