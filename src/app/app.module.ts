import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatDialogModule} from '@angular/material/dialog';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { MatMenuModule } from '@angular/material/menu';
// import {MatIconModule} from '@angular/material/icon';
// import { DashboardComponent } from './Components/dashboard/dashboard.component';
// import { UserListComponent } from './Components/user-list/user-list.component';
// import { UpdatePopupComponent } from './Components/update-popup/update-popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { InstitutionListComponent } from './Components/Admin/institution-list/institution-list.component';
import { ManangerListComponent } from './Components/Admin/mananger-list/mananger-list.component';
// import { StaffListComponent } from './Components/Mananger/staff-list/staff-list.component';
// import { RequestComponent } from './Components/Mananger/request/request.component';
// import { StaffRequestComponent } from './Components/Staff/staff-request/staff-request.component';
// import { StaffDashboardComponent } from './Components/Staff/staff-dashboard/staff-dashboard.component';
// import { ManangerDashboardComponent } from './Components/Manager/mananger-dashboard/mananger-dashboard.component';
// import { ManangerNavbarComponent } from './Components/Manager/mananger-navbar/mananger-navbar.component';
// import { StaffNavbarComponent } from './Components/Staff/staff-navbar/staff-navbar.component';
import { DashboardComponent } from './Components/Admin/dashboard/dashboard.component';
// import { UserListComponent } from './Components/Admin/user-list/user-list.component';
import { UpdatePopupComponent } from './Components/Admin/update-popup/update-popup.component';
import { MainLayoutComponent } from './Components/Admin/main-layout/main-layout.component';
import { StaffDashboardComponent } from './Components/Staff/staff-dashboard/staff-dashboard.component';
import { TransferComponent } from './Components/Admin/transfer/transfer.component';
import { SettingComponent } from './Components/Admin/setting/setting.component';
import { UpdateInstitutionComponent } from './Components/Admin/update-institution/update-institution.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './Components/Admin/confirm-dialog/confirm-dialog.component';
import {MatRadioModule} from '@angular/material/radio';
// import { UpdataManagerComponent } from './Services/Admin/updata-manager/updata-manager.component';
import { UpdateManagerComponent } from './Components/Admin/update-manager/update-manager.component';
import { UserListComponent } from './Components/Admin/user-list/user-list.component';
// import {MatSelectModule} from '@angular/material/select';
// import { StaffListComponent } from './Components/Manager/staff-list/staff-list.component';
// import { RequestComponent } from './Components/Manager/request/request.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    UpdatePopupComponent,
    MainLayoutComponent,
    InstitutionListComponent,
    // ManangerListComponent,
    ManangerListComponent,
    StaffDashboardComponent,
    TransferComponent,
    SettingComponent,
    UpdateInstitutionComponent,
    ConfirmDialogComponent,
    // UpdataManagerComponent,
    UpdateManagerComponent,
    // StaffListComponent,
    // RequestComponent,
    // StaffRequestComponent,
    // StaffDashboardComponent,
    // ManangerDashboardComponent,
    // ManangerNavbarComponent,
    // StaffNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatRadioModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
