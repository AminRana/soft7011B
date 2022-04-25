import { APP_ID, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(
    private http: HttpClient,
  ) { }
  login(apiData: Object) {
    return this.http.post(environment.STAFF_SERVER_BASE_URL+'/auth/login', apiData)

  }
  addStaff(apiData: Object) {
    return this.http.post(environment.STAFF_SERVER_BASE_URL+'/auth/add-staff', apiData)
  }
  removeStaff(apiData: Object) {
    return this.http.post(environment.STAFF_SERVER_BASE_URL+'/auth/remove-staff', apiData)
  }
  getStaffs() {
    return this.http.get(environment.STAFF_SERVER_BASE_URL+'/auth/get-all-staff')

  }
  addAreaData(apiData: Object) {
    return this.http.post(environment.AREA_SERVER_BASE_URL + '/area/add-area', apiData)

  }
  removeArea(apiData: Object) {
    return this.http.post(environment.AREA_SERVER_BASE_URL + '/area/remove-area', apiData)

  }
  addSubAreaData(apiData: object) {
    return this.http.post(environment.AREA_SERVER_BASE_URL + '/area/add-sub-area', apiData)

  }
  getAreaList() {
    return this.http.get(environment.AREA_SERVER_BASE_URL + '/area/list')

  }
  getSubArea(apiData: object) {
    return this.http.post(environment.AREA_SERVER_BASE_URL + '/area/subArea', apiData)

  }
  markInfected(apiData: object) {
    return this.http.post(environment.AREA_SERVER_BASE_URL + '/area/markInfected', apiData)

  }
  getDashData() {
    return this.http.get(environment.DATA_SERVER_BASE_URL + '/data/dashboard')

  }
  
  uploadInfData(apiData: object) {
    return this.http.post(environment.DATA_SERVER_BASE_URL + '/data/saveInfData', apiData)

  }
  geInfData(apiData: object){
    return this.http.post(environment.DATA_SERVER_BASE_URL + '/data/getInfData', apiData)

  }
}
