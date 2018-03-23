import { Pipe, PipeTransform } from '@angular/core';

import { FormatterService } from '../core/formatter.service';

@Pipe({
  name: 'sharedDateTime'
})
export class DateTimePipe implements PipeTransform {

  constructor (public formatter: FormatterService) { }

  transform(time: any): string {

    let date = new Date(parseFloat(time));

    // check for valid date
    if (isNaN(date.getTime())) {
      date = null;
    }

    return this.formatter.dateTime(date);
  }
}
