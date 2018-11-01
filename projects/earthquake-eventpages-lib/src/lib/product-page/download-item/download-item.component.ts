import { ChangeDetectionStrategy, Component, Input } from '@angular/core';


/**
 * Generate download list item for a single product contents
 *
 * @param item any
 *    A single item from the product.contents[]
 */
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'product-page-download-item',
  styleUrls: ['./download-item.component.scss'],
  templateUrl: './download-item.component.html'
})
export class DownloadItemComponent {
  @Input()
  item: any = null;

  /**
   * Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    download item
   */
  trackByIndex (index, item) {
    return index;
  }
}
