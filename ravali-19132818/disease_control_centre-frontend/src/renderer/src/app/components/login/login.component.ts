import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from '../../app-service.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.css'
  ]
})
export class LoginComponent implements OnInit {
  email: any = undefined;
  password: any = undefined;
  errors={
    username:false,
    password:false
  }
  message: string ="";
  constructor(
    private router: Router,
    private service: AppServiceService
  ) { }

  ngOnInit(): void {
  }
  navigate(url:string) {
    this.router.navigate([url])
  }

  login() {
    this.message =""
    var count =0
    if(!this.email){
      this.errors.username=true
      count ++
    }else{
      this.errors.username=false

    }
    if(!this.password){
      this.errors.password=true
      count ++
    }else{
      this.errors.password=false

    }
    if(count !== 0){
      return false
    }
    // this.toDashboard()
// return    this.navigate('dash')
// return    this.navigate('dash')

    var apiData: Object = {
      email: this.email,
      password: this.password
    }
    console.log(apiData)
    this.service.login(apiData).subscribe((response) => {
      // this.router.navigate(['dash'])
      var returnData: any;
      if (response) {
        console.log(response)
        returnData = response
      }

      console.log(returnData)
      if (returnData && returnData.status && returnData.status === 1) {
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('userData', JSON.stringify(returnData.data))
        if (returnData.data.staffType === "Staff") {
          this.navigate('5')

        }else if(returnData.data.staffType === "Admin"){
          this.navigate('dash')

        }else{
          this.navigate('5')
        }
      }
    })
   
      this.message = "Please wait..."
      
    setTimeout(() => {
      this.message = "Wrong Credentials!"
      
    }, 7000);
  }
}
