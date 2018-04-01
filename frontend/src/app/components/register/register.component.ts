import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  register(f) {

    this.authService.register(this.username, this.password).subscribe(success => {
      console.log(success);
      this.router.navigate(['/']);
      this.flashMessage.show('You were successfully registered!', { cssClass: 'alert-success', timeout: 3000 });
    }, error => {
      this.flashMessage.show('Something went wrong', { cssClass: 'alert-danger', timeout: 3000 });
    });
  }
}