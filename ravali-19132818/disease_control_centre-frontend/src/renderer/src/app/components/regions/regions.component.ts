import { Component, OnInit } from '@angular/core';
import { AppServiceService } from 'src/app/app-service.service';

@Component({
  selector: 'app-regions',
  templateUrl: './regions.html',
  styleUrls: ['./regions.css'
  ]
})

export class RegionsComponent implements OnInit {
  areaList: any;
  subAreaList: any = [];
  subArea: any = {};
  userData: any;
  staffType: any;
  panelOpenState = false;
  inTreatment = "";
  totalTest = "";
  positives = "";
  negatives = "";
  incResults = "";
  suspected = "";
  firstDose = "";
  secondDose = "";
  area_id: any;
  sub_area_id: any;
  selected: Object = {};
  totalCases = [];

  constructor(
    private service: AppServiceService

  ) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (this.userData && this.userData.staffType) {
      this.staffType = this.userData.staffType
    }
    console.log(this.userData)
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
      }

    })
  }
  getSubAreas(one: Object) {
    this.selected = one
    this.service.getSubArea(one).subscribe((response) => {

      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response

      }

      if (returnData && returnData['status'] && returnData['status'] == 1) {
        this.subAreaList = returnData.data
      }

    })
  }
  setSubArea(one: object) {
    this.subArea = one
    this.area_id = this.subArea.areaId
    this.sub_area_id = this.subArea._id
  }
  fetchInfData(one: object, i: number) {
    console.log(one)
    if(  this.subAreaList[i].moreData){
      this.subAreaList[i].moreData = null;
    }else{
      this.service.geInfData(one).subscribe((response) => {

        var returnData: any;
        if (response) {
          console.log(response)
          returnData = response
  
        }
  
        if (returnData && returnData['status'] && returnData['status'] == 1) {
          console.log(returnData.data)
          console.log(i)
          if (returnData.data && returnData.data._id){
               this.subAreaList[i].moreData = returnData.data
  
               this.subAreaList[i].moreData.totalCases = parseInt(returnData.data.negative) + parseInt(returnData.data.positive) + parseInt(returnData.data.suspected_infection)
  
               this.subAreaList[i].moreData.tpr = Math.round( (100 * parseInt(returnData.data.positive)) / this.subAreaList[i].moreData.totalCases);
              
               this.subAreaList[i].moreData.totalVaccinated = parseInt(returnData.data.second_dose) + parseInt(returnData.data.first_dose) 
          console.log(this.subAreaList[i])
          }
         
  
        }
  
      })
    }
   
  }
  setInfected(each: object, infection: boolean) {
    // var selected = each
    console.log(each)
    let apiData = {
      subArea: each,
      infection: infection
    }

    console.log(apiData)
    this.service.markInfected(apiData).subscribe((response) => {
      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response

      }
      let oeach: Array<any> = [];
      oeach.push(each)
      if (returnData && returnData['status'] && returnData['status'] == 1) {
        // this.subAreaList = returnData.data
        for (let i = 0; i < this.subAreaList.length; i++) {
          let one = this.subAreaList[i]
          if (oeach[0]._id == one._id) {
            one.infected = true
          }
        }
        console.log(this.subAreaList)
      }

    })
  }
  uploadData() {
    let apiData = {
      area_id: this.area_id,
      positives: this.positives,
      negatives: this.negatives,
      suspected_infection: this.suspected,
      in_treatment: this.inTreatment,
      first_dose: this.firstDose,
      second_dose: this.secondDose,
      inconclusive_results: this.incResults,
      sub_area_id: this.sub_area_id
    }
    console.log(apiData)
    this.service.uploadInfData(apiData).subscribe((response) => {

      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response

      }

      if (returnData && returnData['status'] && returnData['status'] == 1) {
        // this.subAreaList = returnData.data
      }

    })
  }

}
