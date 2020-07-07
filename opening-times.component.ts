import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../provider/services/dashboard.service';
import { CallFlow } from '../../provider/models/callFlow';
import { OpeningTimes, OpeningTimesData } from 'src/app/provider/models/openingTimes';
import { ToasterService } from 'angular2-toaster';

@Component({
  selector: 'app-opening-times',
  templateUrl: './opening-times.component.html',
  styleUrls: ['./opening-times.component.css']
})
export class OpeningTimesComponent implements OnInit {
  days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor(private dashboardService: DashboardService, private toasterService: ToasterService) { }

  callFlowId: any;
  openingTimesModel: OpeningTimes;
  newOpeningTimesModel: OpeningTimes;

  ngOnInit() {
    this.callFlowId = localStorage.getItem('CallFlowId');
    this.getOpeningTimes();
  }

  getOpeningTimes() {

    this.dashboardService.getOpeningTimes(this.callFlowId).subscribe((data: any) => {
      this.openingTimesModel = data;
      error => {

      }
    });
  }

  updateOpeningTimes() {
    this.newOpeningTimesModel = this.openingTimesModel; //updated openingTimes list to be assigned to newOpeningTimesModel
    this.dashboardService.updateOpeningTimes(this.openingTimesModel).subscribe(
      data => {
        this.toasterService.pop("success", "Opening Times", "File has been updated successfully");
      },
      error => {
        this.toasterService.pop("error", "Opening Times", "Server error has occured!!!");
      }
    );
  }

}
