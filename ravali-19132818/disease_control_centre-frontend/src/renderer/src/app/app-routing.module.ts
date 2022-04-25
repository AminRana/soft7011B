import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { AddStaffComponent} from './components/add-staff/add-staff.component';
import { AddAreaComponent} from './components/add-area/add-area.component';
import {LoginComponent} from './components/login/login.component';
import { RegionsComponent } from './components/regions/regions.component';
import {InfectionDataPageComponent  } from './components/infection-data-page/infection-data-page.component';

const routes: Routes = [
  { path:  '', component:  LoginComponent },
  { path:  'dash', component:  Component1Component },
  { path:  '2', component:  Component2Component },
  { path:  '3', component:  AddStaffComponent },
  { path:  '4', component:  AddAreaComponent },
  { path:  '5', component:  RegionsComponent },
  { path:  '6', component:  InfectionDataPageComponent },

//  { path: '404', component: NotfoundComponent },
//  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
