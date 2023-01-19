import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ErrorComponent } from './pages/error/error.component';

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
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
