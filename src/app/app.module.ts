import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmailsComponent } from './emails/emails.component';
import { UserLogoutComponent } from './user-logout/user-logout.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { SendDefaultEmailComponent } from './send-default-email/send-default-email.component';
import { SendLayoutEmailComponent } from './send-layout-email/send-layout-email.component';
import { ProjectsComponent } from './projects/projects.component';
import { NgChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input'
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from './toolbar/toolbar.component'



@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    EmailsComponent,
    UserLogoutComponent,
    LayoutsComponent,
    NavbarComponent,
    StatisticsComponent,
    SendDefaultEmailComponent,
    SendLayoutEmailComponent,
    ProjectsComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatSidenavModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
