import { Pipe, PipeTransform } from '@angular/core';
import { Cooperator } from 'hazdev-ng-template';
import { Event } from '../event';

@Pipe({
  name: 'cooperator'
})
export class CooperatorPipe implements PipeTransform {
  /**
   * Uses the given event to determine the authoritative contributor, then
   * looks up that contributors information in the given contributors array
   * for attribution details. If the contributor is not found or if the
   * information is incomplete, no attribution is presented.
   *
   * @param contributors
   *      List of contributor information as returned from web service.
   * @param event
   *      Current event for which to attribute cooperation
   *
   * @return {Cooperator}
   *      The information used to display attribution by the template.
   */
  transform(contributors: any[], event: Event): Cooperator {
    try {
      const network = event.properties.net;
      const info = contributors.find(contributor => {
        if (contributor.id === network) {
          return true;
        }

        if (
          contributor.aliases &&
          contributor.aliases.indexOf(network) !== -1
        ) {
          return true;
        }
      });

      if (
        info &&
        info.hasOwnProperty('title') &&
        info.hasOwnProperty('url') &&
        info.hasOwnProperty('logo')
      ) {
        return {
          description: info.title,
          imageUrl: info.logo,
          linkUrl: info.url
        } as Cooperator;
      } else {
        throw new Error('Contributor information not found or incomplete.');
      }
    } catch (e) {
      return null;
    }
  }
}
