import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TellUsComponent } from './tell-us/tell-us.component';

const tellUsRoutes: Routes = [
  {
    component: TellUsComponent,
    // this module must be loaded lazily using "loadChildren"
    // the actual url mount point is defined in "app/app-routing.module.ts"
    path: ''
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(tellUsRoutes)]
})
export class TellUsRoutingModule {}
