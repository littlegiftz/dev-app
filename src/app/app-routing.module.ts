import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'clock-in',
    loadChildren: () => import('./views/permission/permission.module').then(m => m.PermissionModule),
  },{
    path: '',
    redirectTo: '/clock-in',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
