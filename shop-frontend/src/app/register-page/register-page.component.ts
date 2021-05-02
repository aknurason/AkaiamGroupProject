import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  formData = {
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    error: '',
    showError: false,
  };

  submitForm() {
    if (this.formData.password !== this.formData.passwordRepeat) {
      this.formData.showError = true;
      this.formData.error = 'The passwords do not match';
      return;
    } else if (this.formData.username.length < 4) {
      this.formData.showError = true;
      this.formData.error = 'The username is too short';
      return;
    } else if (this.formData.email.length < 5) {
      this.formData.showError = true;
      this.formData.error = 'The email is too short';
      return;
    } else if (this.formData.password.length < 4) {
      this.formData.showError = true;
      this.formData.error = 'The password is too short';
      return;
    }
    this.formData.showError = false;
    this.formData.error = '';
    this.authService
      .register(
        this.formData.username,
        this.formData.password,
        this.formData.email
      )
      .subscribe(
        (res) => {
          console.log(res);

          this.authService
            .login(this.formData.username, this.formData.password)
            .subscribe((res) => {
              this.router.navigateByUrl('/');
              window.location.reload();
            });
        },
        (error) => {
          this.formData.showError = true;
          this.formData.error = error.error.username;
        }
      );
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
}
