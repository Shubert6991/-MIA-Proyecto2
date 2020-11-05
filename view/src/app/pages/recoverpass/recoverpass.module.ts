import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecoverpassRoutingModule } from './recoverpass-routing.module';
import { RecoverpassComponent } from './recoverpass.component';


@NgModule({
  declarations: [RecoverpassComponent],
  imports: [
    CommonModule,
    RecoverpassRoutingModule
  ]
})
export class RecoverpassModule { }
