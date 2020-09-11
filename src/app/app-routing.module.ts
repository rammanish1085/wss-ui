import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { 
    path: 'login',
    redirectTo: '/login',
    pathMatch: 'full'
  },

  {
    path: 'oic',
    loadChildren: () => import('./modules/oic/oic.module').then(m => m.OicModule)
    },
  
   {
    path: '',
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
    },

    { 
      path: '**', 
      redirectTo: '/login',
      pathMatch: 'full' 
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
