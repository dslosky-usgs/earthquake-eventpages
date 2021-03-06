import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatDialogModule,
  MatExpansionModule,
  MatListModule,
  MatSortModule,
  MatButtonModule
} from '@angular/material';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { ProductPageModule } from '../product-page/product-page.module';

import { OriginRoutingModule } from './origin-routing.module';

import { DetailComponent } from './detail/detail.component';
import { MagnitudeComponent } from './magnitude/magnitude.component';
import { OriginComponent } from './origin/origin.component';
import { PhaseComponent } from './phase/phase.component';
import { SharedModule } from '../shared/shared.module';
import { MagnitudeDetailComponent } from './magnitude-detail/magnitude-detail.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatExpansionModule,
    MatListModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    ProductPageModule,
    SharedModule,

    OriginRoutingModule
  ],
  declarations: [
    DetailComponent,
    MagnitudeComponent,
    OriginComponent,
    PhaseComponent,
    MagnitudeDetailComponent
  ]
})
export class OriginModule {
}
