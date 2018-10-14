import { PollComponent } from './components/poll/poll.component';
import { AuthService } from './services/auth.service';
import { PollService } from './services/poll.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AddPollComponent } from './components/add-poll/add-poll.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { PollSmallComponent } from './components/poll-small/poll-small.component';
import { MyPollsComponent } from './components/my-polls/my-polls.component';
import { AuthGuard } from './guards/auth.guard';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://5481d7ae4eac4d4bb7bc41745f9dee40@sentry.io/1300680'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    AddPollComponent,
    PollComponent,
    NavbarComponent,
    FooterComponent,
    PollSmallComponent,
    MyPollsComponent,

  ],
  imports: [
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FlashMessagesModule.forRoot(),
    FormsModule
  ],
  providers: [
    AuthService,
    PollService,
    AuthGuard,
    { provide: ErrorHandler, useClass: SentryErrorHandler }],
  bootstrap: [AppComponent]
})
export class AppModule { }
