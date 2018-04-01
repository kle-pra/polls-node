import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  login(f) {

    this.authService.login(this.username, this.password).subscribe(success => {
      console.log(success);
      this.authService.storeToken(success).subscribe(() => {
        this.authService.loginSubject.next(null);
        this.router.navigate(['/']);
        this.flashMessage.show('You were successfully logged in!', { cssClass: 'alert-success', timeout: 3000 });
      }, error => {
        this.flashMessage.show('Wrong email/password', { cssClass: 'alert-danger', timeout: 3000 });
      });
    }, error => {
      console.log(error);
    });

  }

}
