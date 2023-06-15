import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {CreateWorkComponent} from "./create-work/create-work.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {LoginComponent} from "./login/login.component";
import {CreateUserComponent} from "./create-user/create-user.component";
import {ManageUsersComponent} from "./manage-users/manage-users.component";
import {ProfileComponent} from "./profile/profile.component";
import {ManageWorkComponent} from "./manage-work/manage-work.component";
import {CreateClientComponent} from "./create-client/create-client.component";
import {ManagementComponent} from "./management/management.component";
import {CreatePlantComponent} from "./create-plant/create-plant.component";
import {CreateMachineComponent} from "./create-machine/create-machine.component";
import {CreateCommissionComponent} from "./create-commission/create-commission.component";
import {DailyHoursComponent} from "./daily-hours/daily-hours.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";
import {ManageMachinesComponent} from "./manage-machines/manage-machines.component";
import {ManageClientsComponent} from "./manage-clients/manage-clients.component";
import {ManagePlantsComponent} from "./manage-plants/manage-plants.component";
import {ManageCommissionsComponent} from "./manage-commissions/manage-commissions.component";

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/change-password', component: ChangePasswordComponent},
  {path: 'reports', component: ManageWorkComponent},
  {path: 'reports/daily', component: DailyHoursComponent},
  {path: 'manage', component: ManagementComponent},
  {path: 'manage/clients', component: ManageClientsComponent},
  {path: 'manage/commissions', component: ManageCommissionsComponent},
  {path: 'manage/plants', component: ManagePlantsComponent},
  {path: 'manage/machines', component: ManageMachinesComponent},
  {path: 'manage/users', component: ManageUsersComponent},
  {path: 'add', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'add/report', component: CreateWorkComponent},
  {path: 'add/user', component: CreateUserComponent},
  {path: 'add/client', component: CreateClientComponent},
  {path: 'add/commission', component: CreateCommissionComponent},
  {path: 'add/plant', component: CreatePlantComponent},
  {path: 'add/machine', component: CreateMachineComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
