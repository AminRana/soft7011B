import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navlist',
  templateUrl: './navlist.component.html',
  styleUrls: ['./navlist.component.css']
})
export class NavlistComponent implements OnInit {
  userData:any = "";
  @Output() sidenavClose = new EventEmitter();

  constructor() { }

  ngOnInit() {
    // this.userData =localStorage.getItem('userData') 
    // console.log(this.userData)
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();

  }
}
