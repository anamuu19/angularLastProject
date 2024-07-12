import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { MainLayoutComponent } from './Components/Admin/main-layout/main-layout.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
import { UserListComponent } from './Components/Admin/user-list/user-list.component';
import { InstitutionListComponent } from './Components/Admin/institution-list/institution-list.component';
import { ManangerListComponent } from './Components/Admin/mananger-list/mananger-list.component';
// import { ManangerNavbarComponent } from './Components/Manager/mananger-navbar/mananger-navbar.component';
// import { ManangerDashboardComponent } from './Components/Manager/mananger-dashboard/mananger-dashboard.component';
// import { RequestComponent } from './Components/Manager/request/request.component';
// import { StaffListComponent } from './Components/Manager/staff-list/staff-list.component';
// import { StaffNavbarComponent } from './Components/Staff/staff-navbar/staff-navbar.component';
import { StaffDashboardComponent } from './Components/Staff/staff-dashboard/staff-dashboard.component';
import { TransferComponent } from './Components/Admin/transfer/transfer.component';
import { SettingComponent } from './Components/Admin/setting/setting.component';
import { ManagerDashboardComponent } from './Components/Manager/manager-dashboard/manager-dashboard.component';
import { ManagerNavbarComponent } from './Components/Manager/manager-navbar/manager-navbar.component';
import { RegisterStaffComponent } from './Components/Manager/register-staff/register-staff.component';
import { StaffNavbarComponent } from './Components/Staff/staff-navbar/staff-navbar.component';
import { TransferFormComponent } from './Components/Staff/transfer-form/transfer-form.component';
import { TransferListComponent } from './Components/Manager/transfer-list/transfer-list.component';
// import { StaffRequestComponent } from './Components/Staff/staff-request/staff-request.component';


const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},

  //Admin
  {path:'layout', component:MainLayoutComponent, children:[
    {path:'', component:DashboardComponent},
    {path:'user', component:UserListComponent},
    {path:'institution-list',component:InstitutionListComponent},
    {path:'manager-list',component:ManangerListComponent},
    {path:'transfer',component:TransferComponent},
    {path:'setting',component:SettingComponent}
  ]},

  //Staff
  {path:'user-dashboard',component:StaffNavbarComponent, children:[
    {path:'', component:StaffDashboardComponent},
    {path:'transfer',component:TransferFormComponent}
  ]
},


  //manager
  {path:'navbar', component:ManagerNavbarComponent, children:[
    {path:'', component:ManagerDashboardComponent},
    {path:'register-staff', component:RegisterStaffComponent},
    {path:'transfer', component:TransferListComponent}
  ]}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
