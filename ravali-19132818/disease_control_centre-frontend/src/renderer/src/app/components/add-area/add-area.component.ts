import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.html',
  styleUrls: [
    './add-area.css'
  ]
})
export class AddAreaComponent implements OnInit {
  areaName: any = undefined;
  latitude: any = undefined;
  longitude: any = undefined;
  area: any = undefined;
  population: any = undefined;
  subAreas: any = [];
  areaList: any = [];
  showToast: boolean = false;
  toastMessage: any = "";
  constructor(
    private service: AppServiceService

  ) { }

  ngOnInit(): void {
    this.getAreaList()
  }
  getAreaList() {
    this.service.getAreaList().subscribe((response) => {

      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response

      }

      if (returnData && returnData['status'] && returnData['status'] == 1) {
        this.areaList = returnData.data
        this.showToast = true
        this.toastMessage = "Area details Fetched!"
        setTimeout(() => {
          this.showToast = false
          this.toastMessage = ""
        }, 5000);
      }

    })
  }
  saveArea() {
    console.log(this.areaName, this.latitude, this.longitude, this.area, this.population)
    console.log(this.subAreas)
    this.areaList.push({
      name: this.areaName,
      lat: this.latitude,
      long: this.longitude,
      areaSqKm: this.area,
      population: this.population,

    })
    console.log(this.areaList)
    var apiData: object = {
      areaName: this.areaName,
      latitude: this.latitude,
      longitude: this.longitude,
      area: this.area,
      population: this.population,
    }
    var done = false
    this.service.addAreaData(apiData).subscribe((response) => {

      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response

      }

      if (returnData && returnData['status'] && returnData['status'] == 1) {
        console.log(returnData)
        console.log(this.subAreas)
        
        this.saveSubArea(returnData)
        this.showToast = true
        this.toastMessage = "Area details Saved!"
        setTimeout(() => {
          this.showToast = false
          this.toastMessage = ""
        }, 5000);
        // this.toDashboard()
      }

    })
   


    // if (done) {

    // }


  }
  clear() {
    this.areaName = ""
    this.latitude = ""
    this.longitude = ""
    this.area = ""
    this.population = ""
    this.subAreas = []
  }
  saveSubArea(returnData: any) {
    var apiSubData: object = {
      subAreas: this.subAreas,
      areaId: returnData.data.id
    }
    console.log(apiSubData)
    this.service.addSubAreaData(apiSubData).subscribe((responseData) => {
      console.log(responseData)
      this.clear()
    });
  }
  addSubArea() {
    console.log('adding sub area')
    this.subAreas.push({
      subAreaName: "",
      subLatitude: "",
      subLongitude: "",
      sqkm: "",
      subPopulation: ""
    })
  }
  removeArea(each:string, index:number){
    console.log(each)
      let apiData = {
        area_id: each
      }
      this.service.removeArea(apiData).subscribe((response) => {
        var returnData: any;
        if (response) {
          console.log(response)
          returnData = response
  
        }
  
        if (returnData && returnData['status'] && returnData['status'] == 1) {
          this.showToast = true
          this.toastMessage = "Area Deleted Sucessfully!"
          this.areaList.splice(index, 1);
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
