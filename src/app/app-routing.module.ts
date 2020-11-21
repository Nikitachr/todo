import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/noAuth.guard';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { RegistrationComponent } from './registration/registration.component';


const routes: Routes = [
  { path: '',   redirectTo: '/lists', pathMatch: 'full' },
  { path: 'lists', component: MainPageComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent, canActivate: [NotAuthGuard] },
  { path: 'registration', component: RegistrationComponent, canActivate: [NotAuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
