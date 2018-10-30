import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material';

import { SharedModule } from '@shared/shared.module';
import { DateTimePipe } from './date-time.pipe';
import { DownloadComponent } from './download/download.component';
import { DownloadItemComponent } from './download-item/download-item.component';
import { FileSizePipe } from './file-size.pipe';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { FileExtensionPipe } from './file-extension.pipe';

@NgModule({
  declarations: [
    DateTimePipe,
    DownloadComponent,
    DownloadItemComponent,
    FileExtensionPipe,
    FileSizePipe,
    FooterComponent,
    HeaderComponent,
    ProductPageComponent
  ],
  exports: [DateTimePipe, ProductPageComponent, DownloadComponent],
  imports: [CommonModule, MatExpansionModule, SharedModule]
})
export class ProductPageModule {}
