import {
  HttpClient,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EventService } from '@core/event.service';
import { Observable, of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Event } from '../../event';
import { FormLanguageService } from '../form-language.service';

/**
 * The main tell-us form which submits all DYFI information from user
 *
 */
@Component({
  selector: 'tell-us-form',
  styleUrls: ['./form.component.scss'],
  templateUrl: './form.component.html'
})
export class FormComponent implements AfterViewInit, OnDestroy {
  // these answers control whether the submit button is enabled
  // others are populated as needed
  answers: any = {
    ciim_mapLat: null,
    ciim_mapLon: null,
    ciim_time: null,
    fldSituation_felt: null
  };
  error: any = null;
  // boolean used to either show or not show the time input field
  hasEvent = false;
  // The rendered map at the top of the form
  responseUrl = '/data/dyfi/form/response.php';
  subscription: Subscription = new Subscription();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FormComponent>,
    public eventService: EventService,
    public httpClient: HttpClient,
    public languageService: FormLanguageService
  ) {}

  ngAfterViewInit() {
    this.subscription.add(
      this.eventService.event$.subscribe(event => {
        this.setEvent(event);
        if (event.data) {
          this.hasEvent = true;
        }
      })
    );

    // default language
    this.answers.language = 'en';
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  /**
   * Update response information
   *
   * @param answer
   *        object with answers, field(s) are keys, values are values.
   */
  onAnswer(answer: any) {
    if (!answer) {
      return;
    }
    // copy responses into answers
    for (const key of Object.keys(answer)) {
      this.answers[key] = answer[key];
    }
  }

  /**
   * Called when user clicks cancel.
   */
  onCancel() {
    this.dialogRef.close(false);
  }

  /**
   * Called when form is submitted. Passes answers back to dialog opener.
   */
  onSubmit() {
    let params = new HttpParams();

    const validated = this.validateForm();

    if (validated) {
      for (const key in this.answers) {
        if (this.answers.hasOwnProperty(key)) {
          params = params.append(key, this.answers[key]);
        }
      }
      params = params.append('format', 'json');
      params = params.append('form_version', '1.10');

      // Post the form
      this.httpClient
        .post(this.responseUrl, params)
        .pipe(catchError(this.handleError()))
        .subscribe(response => {
          this.dialogRef.close(response);
        });
    }
  }

  /**
   * Set event information
   *
   * @param event
   *     The event
   */
  setEvent(event: Event) {
    let time = event.properties.time || null;
    if (time) {
      time = new Date(time).toISOString();
    }

    this.answers.eventid = event.id;
    this.answers.ciim_time = time;
  }

  /**
   * Called when user selects a language.
   *
   * @param language
   *     selected language.
   */
  setLanguage(language: string) {
    this.answers.language = language;
    this.languageService.getLanguage(language);
  }

  /** Checks for changes to data by index
   *
   * @param index
   *    index of array
   * @param item
   *    dyfi item
   */
  trackByIndex(index, item) {
    return index;
  }

  /**
   * Checks to make sure that required fields were filled out
   * before submitting.
   *
   * @returns
   *     A true or false validation response
   */
  validateForm() {
    let key;
    const errors = [];
    const required = [
      'fldSituation_felt',
      'ciim_mapLat',
      'ciim_mapLon',
      'ciim_time'
    ];

    // Validate all responses
    for (let i = 0, len = required.length; i < len; i++) {
      key = required[i];
      if (!this.answers.hasOwnProperty(key) || this.answers[key] === null) {
        errors.push(key);
      }
    }

    if (errors.length > 0) {
      throw new Error('Required fieldsx` missing: ' + errors.join(', '));
    }

    return true;
  }

  /**
   * Error handler for http requests.
   *
   * @returns observable error
   */
  private handleError() {
    return (error: HttpErrorResponse): Observable<any> => {
      this.error = error;
      return of(error);
    };
  }
}
