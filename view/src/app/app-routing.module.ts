import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CheckLoginGuard } from './shared/guards/check-login.guard';
import { HomeGuardGuard } from './shared/guards/home-guard.guard';

const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate:[HomeGuardGuard]
  }, 
  { 
    path: 'notFound', 
    loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) 
  }, 
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.module').then(m => m.AdminModule) 
  }, 
  { 
    path: 'login', 
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginModule),
    canActivate:[CheckLoginGuard] 
  },
  { 
    path: 'registro', 
    loadChildren: () => import('./pages/registro/registro.module').then(m => m.RegistroModule) 
  },
  { path: 'profile', 
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule) 
  },
  { 
    path: 'recoverpass/:id', 
    loadChildren: () => import('./pages/recoverpass/recoverpass.module').then(m => m.RecoverpassModule) 
  },
  { path: 'sell', loadChildren: () => import('./pages/sell/sell.module').then(m => m.SellModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
