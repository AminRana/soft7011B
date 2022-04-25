import { Component, OnInit, NgZone } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';
import { IpcService } from 'src/app/ipc.service';

@Component({
  selector: 'app-component1',
  templateUrl: './component1.component.html',
  styleUrls: ['./component1.component.css']
})
export class Component1Component implements OnInit {
  arch = '-';
  hostname = '-';
  platform = '-';
  release = '-';
  showToast: boolean = false;
  toastMessage: string = "";
  dashData = {

  }
  constructor(
    private ipcService: IpcService,
    private ngZone: NgZone,
    private service: AppServiceService
  ) { }
  chartType = 'line';
  ngOnInit() {
    this.ipcService.getSystemInfoAsync()
      .subscribe(systemInfo => {
        this.ngZone.run(() => {
          this.arch = systemInfo.Arch;
          this.hostname = systemInfo.Hostname;
          this.platform = systemInfo.Platform;
          this.release = systemInfo.Release;
        });
      });
    this.getData()

  }
  login() {

  }
  getData() {
    var returnData: any;
    this.service.getDashData()
    .subscribe((response) => {
     
      if (response) {
        returnData = response

      }

      if (returnData && returnData['status'] && returnData['status'] == 1) {
        this.showToast = true
        this.toastMessage = "Staff List Fetched!"
        this.dashData = returnData.data
        console.log(this.dashData)
        setTimeout(() => {
          this.showToast = false
          this.toastMessage = ""
        }, 3000);
      }
      // this.toDashboard()

    });
    // this.dashData = returnData.data
    // console.log(this.dashData)

  }

}

