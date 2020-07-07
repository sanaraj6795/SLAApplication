import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../provider/services/dashboard.service';
import { AuthenticationService } from '../../provider/services/authentication.service';
import { CallFlow } from '../../provider/models/callFlow';

@Component({
  selector: 'app-callflow',
  templateUrl: './callflow.component.html',
  styleUrls: ['./callflow.component.css']
})
export class CallflowComponent implements OnInit {
  teamNames: any;
  callFlow: any;
  currentUser: any;
  displayedCallFlow: CallFlow[] = [];

  constructor(private dashboardService: DashboardService,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.getTeams();
  }

  private getTeams() {
    let callFlowSelected=localStorage.getItem('CallFlowId');
    this.dashboardService.getTeams().subscribe(
      data => {
        this.teamNames = data[0];
        this.callFlow = data[1].callFlows;
        let value = this.callFlow.filter(x => x.value == true);
        let finalValue = this.teamNames.filter(o1 => value.some(o2 => o1.id === o2.callFlowId));
        finalValue.map(x => {
          this.displayedCallFlow.push({ id: x.id, disabled: false, callFlowName: x.type });
        });
        this.displayedCallFlow[0].disabled = true;
        this.storeCurrentCallFlowDetails(this.displayedCallFlow[0]);
        if (!callFlowSelected) {
          this.displayedCallFlow[0].disabled = true;
          this.storeCurrentCallFlowDetails(this.displayedCallFlow[0]);
        }
        if (callFlowSelected) {
          let data = this.displayedCallFlow.find(x => x.id == callFlowSelected);
          let indexValue = this.displayedCallFlow.indexOf(data);
          this.displayedCallFlow[indexValue].disabled = true;
        }
        /*//test
        this.teamNames.map(x=>{
         this.displayedCallFlow.push({id : x.id,disabled:false,callFlowName:x.type});
        })
        if(!value){
        this.displayedCallFlow[0].disabled=true;
        this.storeCurrentCallFlowDetails(this.displayedCallFlow[0]);
        }
        if(value){
         let data=this.displayedCallFlow.find(x=>x.id==value);
         let indexValue =this.displayedCallFlow.indexOf(data);
         this.displayedCallFlow[indexValue].disabled=true;
        }*/
      },
      error => {
      });
  }

  selectedCallFlow(selectedFlow) {
    let indexValue = this.displayedCallFlow.indexOf(selectedFlow);
    this.displayedCallFlow.map(x => x.disabled = false);
    this.displayedCallFlow[indexValue].disabled = true;
    this.storeCurrentCallFlowDetails(this.displayedCallFlow[indexValue]);
  }
  storeCurrentCallFlowDetails(details: CallFlow) {
    localStorage.setItem('CallFlowId', details.id);
    localStorage.setItem('CallFlowName', details.callFlowName);
  }
}
