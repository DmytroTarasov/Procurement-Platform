import { Component, Input, OnInit } from '@angular/core';
import { RequestModel } from 'src/app/_models/request.model';
import { measurementUnits, getShortenMeasurementUnit } from 'src/app/_models/resources/measurement-units';
import { requestStatuses, requestStatusesColors } from 'src/app/_models/resources/request-statuses';

@Component({
  selector: 'app-requests-list-item',
  templateUrl: './requests-list-item.component.html',
  styleUrls: ['./requests-list-item.component.scss']
})
export class RequestsListItemComponent implements OnInit {
  @Input() request: RequestModel;
  measurementUnits = measurementUnits;
  requestStatuses = requestStatuses;
  requestStatusesColors = requestStatusesColors;
  getShortenMeasurementUnit = getShortenMeasurementUnit;

  constructor() { }

  ngOnInit(): void {
  }

  get subdivisionAddress() {
    return `${this.request.subdivision.street}, ${this.request.subdivision.city}`;
  }
}
