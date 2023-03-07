import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DataComponent} from './data/data.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CreateWorkComponent} from './create-work/create-work.component';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {LoginComponent} from './login/login.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {ManageUsersComponent} from './manage-users/manage-users.component';
import {ForbiddenComponent} from './forbidden/forbidden.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {HeaderComponent} from './header/header.component';
import {ProfileComponent} from './profile/profile.component';
import {ManageWorkComponent} from './manage-work/manage-work.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@NgModule({
  declarations: [AppComponent, DataComponent, CreateWorkComponent, NotFoundComponent, DashboardComponent, LoginComponent, CreateUserComponent, ManageUsersComponent, ForbiddenComponent, HeaderComponent, ProfileComponent, ManageWorkComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, AppRoutingModule, FontAwesomeModule, BrowserAnimationsModule, MatSlideToggleModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
