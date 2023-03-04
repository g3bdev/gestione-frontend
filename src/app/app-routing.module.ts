import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddActivityComponent} from "./add-activity/add-activity.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {ManageUsersComponent} from "./manage-users/manage-users.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'add', component: DashboardComponent},
  {path: 'add/activity', component: AddActivityComponent},
  {path: 'add/user', component: CreateUserComponent},
  {path: 'users', component: ManageUsersComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
