import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {BoardAdminComponent} from "./board-admin/board-admin.component";
import {ProfileComponent} from "./profile/profile.component";
import {RegisterComponent} from "./register/register.component";
import {BoardModeratorComponent} from "./board-moderator/board-moderator.component";
import {SearchJobComponent} from "./search-job/search-job.component";
import {DetailedOfferComponent} from "./detailed-offer/detailed-offer.component";

const routes: Routes = [
  { path: 'search-job/:keyword', component: HomeComponent},
  { path: 'home', component: HomeComponent },
  { path: 'oferta/:id', component: DetailedOfferComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'mod', component: BoardModeratorComponent },
  { path: 'admin', component: BoardAdminComponent },
  { path: 'search-job',component: SearchJobComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
