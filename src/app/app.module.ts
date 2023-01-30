import { AddUnitComponent } from './components/admin/units/add-unit/add-unit.component';
import { AlluserComponent } from './components/admin/users/alluser/alluser.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { NavbarItemComponent } from './shared/navbar/navbar-item/navbar-item.component';
import { NavbarItemsComponent } from './shared/navbar/navbar-items/navbar-items.component';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BuildingsComponent } from './pages/buildings/buildings.component';
import { UnitsComponent } from './pages/units/units.component';
import { ProjectCardComponent } from './components/project-card/project-card.component';
import { ProjectCardsComponent } from './components/project-cards/project-cards.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ProjectComponent } from './pages/single/project/project.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ErrorComponent } from './shared/error/error.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { ProfileInfoComponent } from './components/profile-info/profile-info.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UpdateProfileImageComponent } from './pages/update-profile-image/update-profile-image.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgerPasswordComponent } from './pages/forger-password/forger-password.component';
import { BulidingsCardComponent } from './components/bulidings-card/bulidings-card.component';
import { BuildingComponent } from './pages/single/building/building.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { EdituserComponent } from './components/admin/users/edituser/edituser.component';
import { AdduserComponent } from './components/admin/users/adduser/adduser.component';
import { AllProjectComponent } from './components/admin/project/all-project/all-project.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { TestComponent } from './test/test.component';
import { EditProjectComponent } from './components/admin/project/edit-project/edit-project.component';
import { AddProjectComponent } from './components/admin/project/add-project/add-project.component';

import { AllBuildingsComponent } from './components/admin/buildings/all-buildings/all-buildings.component';
import { AddBuildingComponent } from './components/admin/buildings/add-building/add-building.component';
import { EditBuildingComponent } from './components/admin/buildings/edit-building/edit-building.component';
import { AllUnitsComponent } from './components/admin/units/all-units/all-units.component';
import { BuyUnitComponent } from './components/admin/units/buy-unit/buy-unit.component';
import { EditUnitComponent } from './components/admin/units/edit-unit/edit-unit.component';
import { AllPaymentComponent } from './components/admin/payment/all-payment/all-payment.component';
import { NewPaidComponent } from './components/admin/payment/new-paid/new-paid.component';
import { EditPaymentComponent } from './components/admin/payment/edit-payment/edit-payment.component';
import { SinglePaymentComponent } from './components/admin/payment/single-payment/single-payment.component';
import { PaymentPdfComponent } from './components/admin/payment/payment-pdf/payment-pdf.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NavbarItemComponent,
    NavbarItemsComponent,
    HomeComponent,
    ProjectsComponent,
    BuildingsComponent,
    UnitsComponent,
    ProjectCardComponent,
    ProjectCardsComponent,
    ProjectComponent,
    LoginComponent,
    CarouselComponent,
    ErrorComponent,
    ProfileComponent,
    SidebarComponent,
    ProfileInfoComponent,
    EditProfileComponent,
    UpdateProfileImageComponent,
    ChangePasswordComponent,
    ForgerPasswordComponent,
    BulidingsCardComponent,
    BuildingComponent,
    DashboardComponent,
    AlluserComponent,
    EdituserComponent,
    AdduserComponent,
    AllProjectComponent,
    LoadingSpinnerComponent,
    TestComponent,
    EditProjectComponent,
    AddProjectComponent,
    AllBuildingsComponent,
    AddBuildingComponent,
    EditBuildingComponent,
    AllUnitsComponent,
    BuyUnitComponent,
    EditUnitComponent,
    AllPaymentComponent,
    NewPaidComponent,
    EditPaymentComponent,
    SinglePaymentComponent,
    PaymentPdfComponent,
    AddUnitComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    PdfViewerModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
