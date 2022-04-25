import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IpcService } from './ipc.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Disease control center';

    
    constructor(private ipcService: IpcService,
      private router: Router) {
  }

  clickDevTools() {
    this.ipcService.openDevTools();
  }
  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
  }
}
