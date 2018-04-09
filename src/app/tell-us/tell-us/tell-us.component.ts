import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../..';
import { MatDialog, MatDialogRef } from '@angular/material';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-tell-us',
  templateUrl: './tell-us.component.html',
  styleUrls: ['./tell-us.component.scss']
})
export class TellUsComponent implements OnInit {

  public dialogRef: MatDialogRef<FormComponent> = null;

  constructor (
    public dialog: MatDialog,
    public eventService: EventService
  ) { }

  ngOnInit () {
    this.showForm();
  }

  onResponse (response) {
    // process form response
    console.log(response);
  }

  showForm () {
    this.dialogRef = this.dialog.open(FormComponent, {
      data: {
        eventService: this.eventService
      }
    });

    this.dialogRef.afterClosed().subscribe((response) => {
      this.dialogRef = null;
      if (response !== null) {
        this.onResponse(response);
      }
    });
  }

}