import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {DataComponent} from './data/data.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddActivityComponent} from './add-activity/add-activity.component';
import {AppRoutingModule} from './app-routing.module';
import {NotFoundComponent} from './not-found/not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    AddActivityComponent,
    NotFoundComponent,
    DashboardComponent,
    LoginComponent,
    CreateUserComponent,
    ManageUsersComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
