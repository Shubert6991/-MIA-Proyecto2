import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';

const routes: Routes = [
  { 
    path: '', 
    component: LoginComponent 
  },
  {
    path: 'recover', 
    loadChildren: () => import('../../recover/recover.module').then(m => m.RecoverModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
