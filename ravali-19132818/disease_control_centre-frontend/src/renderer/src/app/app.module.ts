import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Component1Component } from './components/component1/component1.component';
import { Component2Component } from './components/component2/component2.component';
import { NavlistComponent } from './components/navlist/navlist.component';
import { AddStaffComponent } from './components/add-staff/add-staff.component';
import { AddAreaComponent } from './components/add-area/add-area.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegionsComponent } from './components/regions/regions.component';
import { InfectionDataPageComponent } from './components/infection-data-page/infection-data-page.component'; 

@NgModule({
  declarations: [
    AppComponent,
    Component1Component,
    Component2Component,
    NavlistComponent,
    AddStaffComponent,
    AddAreaComponent,
    LoginComponent,
    RegionsComponent,
    InfectionDataPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
