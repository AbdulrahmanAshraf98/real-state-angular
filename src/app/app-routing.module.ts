import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { BuildingsComponent } from './pages/buildings/buildings.component';
import { UnitsComponent } from './pages/units/units.component';
import { ProjectComponent } from './pages/single/project/project.component';
import { LoginComponent } from './pages/login/login.component';
import { ErrorComponent } from './pages/error/error.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { UpdateProfileImageComponent } from './pages/update-profile-image/update-profile-image.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';
import { ForgerPasswordComponent } from './pages/forger-password/forger-password.component';
import { BuildingComponent } from './pages/single/building/building.component';

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
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
