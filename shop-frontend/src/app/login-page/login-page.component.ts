import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };

  submitForm() {
    this.authService
      .login(this.loginData.username, this.loginData.password)
      .subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/');
        window.location.reload();
      });
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
}
