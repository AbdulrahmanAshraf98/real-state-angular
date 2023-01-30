import { AllPaymentComponent } from './components/admin/payment/all-payment/all-payment.component';
import { EditUnitComponent } from './components/admin/units/edit-unit/edit-unit.component';
import { AddBuildingComponent } from './components/admin/buildings/add-building/add-building.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BuildingsComponent } from './pages/buildings/buildings.component';
import { UnitsComponent } from './pages/units/units.component';
import { ProjectComponent } from './pages/single/project/project.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './shared/error/error.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UpdateProfileImageComponent } from './pages/update-profile-image/update-profile-image.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgerPasswordComponent } from './pages/forger-password/forger-password.component';
import { BuildingComponent } from './pages/single/building/building.component';
import { DashboardComponent } from './pages/admin/dashboard/dashboard.component';
import { AlluserComponent } from './components/admin/users/alluser/alluser.component';
import { EdituserComponent } from './components/admin/users/edituser/edituser.component';
import { AdduserComponent } from './components/admin/users/adduser/adduser.component';
import { AllProjectComponent } from './components/admin/project/all-project/all-project.component';
import { EditProjectComponent } from './components/admin/project/edit-project/edit-project.component';
import { AddProjectComponent } from './components/admin/project/add-project/add-project.component';
import { AllBuildingsComponent } from './components/admin/buildings/all-buildings/all-buildings.component';
import { EditBuildingComponent } from './components/admin/buildings/edit-building/edit-building.component';
import { AllUnitsComponent } from './components/admin/units/all-units/all-units.component';
import { BuyUnitComponent } from './components/admin/units/buy-unit/buy-unit.component';
import { PaymentPdfComponent } from './components/admin/payment/payment-pdf/payment-pdf.component';
import { AddUnitComponent } from './components/admin/units/add-unit/add-unit.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'projects',
    children: [
      { path: '', component: ProjectsComponent },
      { path: ':projectId', component: ProjectComponent },
    ],
  },
  {
    path: 'buildings',
    children: [
      { path: '', component: BuildingsComponent },
      { path: ':buildingId', component: BuildingComponent },
    ],
  },
  { path: 'units', component: UnitsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'forget-password', component: ForgerPasswordComponent },
  {
    path: 'profile',

    children: [
      { path: '', component: ProfileComponent },

      {
        path: 'edit',
        component: EditProfileComponent,
      },
      {
        path: 'upload-new-image',
        component: UpdateProfileImageComponent,
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent,
      },
    ],
  },
  {
    path: 'admin',
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'users',
        children: [
          {
            path: '',
            component: AlluserComponent,
          },
          {
            path: 'add',
            component: AdduserComponent,
          },
          {
            path: ':userId/edit',
            component: EdituserComponent,
          },
        ],
      },
      {
        path: 'projects',
        children: [
          {
            path: '',
            component: AllProjectComponent,
          },
          {
            path: 'add',
            component: AddProjectComponent,
          },
          {
            path: ':projectId/edit',
            component: EditProjectComponent,
          },
        ],
      },
      {
        path: 'buildings',
        children: [
          {
            path: '',
            component: AllBuildingsComponent,
          },
          {
            path: 'add',
            component: AddBuildingComponent,
          },
          {
            path: ':buildingId/edit',
            component: EditBuildingComponent,
          },
        ],
      },
      {
        path: 'units',
        children: [
          {
            path: '',
            component: AllUnitsComponent,
          },
          {
            path: 'add',
            component: AddUnitComponent,
          },
          {
            path: ':unitId/buy',
            component: BuyUnitComponent,
          },
          {
            path: ':unitId/edit',
            component: EditUnitComponent,
          },
        ],
      },
      {
        path: 'payments',
        children: [
          {
            path: '',
            component: AllPaymentComponent,
          },
          {
            path: ':paymentId/paymentPdf',
            component: PaymentPdfComponent,
          },
        ],
      },
    ],
  },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
