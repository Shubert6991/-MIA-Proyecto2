import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecoverpassComponent } from './recoverpass.component';

const routes: Routes = [{ path: '', component: RecoverpassComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecoverpassRoutingModule { }
