import { Component, Input } from '@angular/core';


/**
 * Creates a table on the PAGER module to define the populations
 * exposed to different levels of shaking.
 *
 * @param pager {Object}
 *     parsed pager.xml object (from pagerXmlService.pagerXml$)
 */
@Component({
  selector: 'pager-population',
  templateUrl: './pager-population.component.html',
  styleUrls: ['./pager-population.component.scss']
})
export class PagerPopulationComponent {

  public columnsToDisplay = [
    'mmi',
    'shaking',
    'population'
  ];

  @Input() pager: any;
}
