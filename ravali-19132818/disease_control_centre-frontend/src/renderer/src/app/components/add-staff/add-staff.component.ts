import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../../app-service.service'

@Component({
  selector: 'app-add-staff',
  templateUrl: "./add-staff.html",
  styleUrls: ['./add-staff.css'
  ]
})
export class AddStaffComponent implements OnInit {
  staffName: any = undefined;
  staffEmail: any = undefined;
  staffType: any = undefined;
  password: any = undefined;
  staffList: any = [];
  showToast: boolean = false;
  toastMessage = "";
  cancelDeleteAction: boolean = false;
  constructor(
    private service: AppServiceService

  ) { }

  ngOnInit(): void {
    this.getSTaffs()
  }
  getSTaffs() {
    this.service.getStaffs().subscribe((response) => {
      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response

      }

      if (returnData && returnData['status'] && returnData['status'] == 1) {
        this.showToast = true
        this.toastMessage = "Staff List Fetched!"
        this.staffList = returnData.data
        console.log(this.staffList)
        this.staffEmail = undefined
        this.staffName = undefined
        this.staffType = undefined
        this.password = undefined
        setTimeout(() => {
          this.showToast = false
          this.toastMessage = ""
        }, 3000);
      }
      // this.toDashboard()

    })
  }
  saveStaff() {
    console.log(this.staffName, this.staffEmail, this.staffType, this.password)

    var apiData: object = {
      staffName: this.staffName,
      email: this.staffEmail,
      staffType: this.staffType,
      password: this.password
    }
    console.log(apiData)
    this.service.addStaff(apiData).subscribe((response) => {
      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response

      }

      if (returnData && returnData['status'] && returnData['status'] == 1) {
        this.showToast = true
        this.toastMessage = "Staff Added Sucessfully!"
        this.staffList.push({
          staffName: this.staffName,
          staffType: this.staffType,
          email: this.staffEmail
        })
        this.clear()
        setTimeout(() => {
          this.showToast = false
          this.toastMessage = ""
        }, 5000);
      }
      // this.toDashboard()

    })
    console.log(this.staffList)

  }
  clear() {
    this.staffEmail = undefined
    this.staffName = undefined
    this.staffType = undefined
    this.password = undefined
  }
  removeStaff(staff: string, i: number) {
      console.log(staff)
      let apiData = {
        staff_id: staff
      }
      this.service.removeStaff(apiData).subscribe((response) => {
        var returnData: any;
        if (response) {
          console.log(response)
          returnData = response
  
        }
  
        if (returnData && returnData['status'] && returnData['status'] == 1) {
          this.showToast = true
          this.toastMessage = "Staff Deleted Sucessfully!"
          this.staffList.splice(i, 1);
          this.clear()
          setTimeout(() => {
            this.showToast = false
            this.toastMessage = ""
          }, 5000);
        }
        // this.toDashboard()
      })
  }

}