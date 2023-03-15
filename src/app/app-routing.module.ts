import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailsComponent } from './emails/emails.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { ProjectsComponent } from './projects/projects.component';
import { SendDefaultEmailComponent } from './send-default-email/send-default-email.component';
import { SendLayoutEmailComponent } from './send-layout-email/send-layout-email.component';
import { AuthGuardService } from './service/auth-guard.service';
import { StatisticsComponent } from './statistics/statistics.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';

const routes: Routes = [
  {path: 'login', component: UserLoginComponent},
  {path: 'logout', component: UserLogoutComponent,canActivate:[AuthGuardService]},
  {path: '', component: StatisticsComponent,canActivate:[AuthGuardService]},
  {path: 'statistics', component: StatisticsComponent,canActivate:[AuthGuardService]},
  {path: 'emails', component: EmailsComponent,canActivate:[AuthGuardService]},
  {path: 'layouts', component: LayoutsComponent,canActivate:[AuthGuardService]},
  {path: 'defaultEmails', component: SendDefaultEmailComponent, canActivate:[AuthGuardService]},
  {path: 'layoutEmails', component:SendLayoutEmailComponent, canActivate:[AuthGuardService]},
  {path: 'projects', component:ProjectsComponent, canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
