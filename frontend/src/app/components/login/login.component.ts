import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorText = '';

  @ViewChild('errorRef') errorRef!: ElementRef<HTMLDivElement>;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email.trim() || !this.password.trim()) {
      this.errorRef.nativeElement.textContent =
        'Email and password are required!';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorRef.nativeElement.textContent = 'Invalid email format!';
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (response: any) => {
        if (!response.token) {
          this.errorRef.nativeElement.textContent = 'Invalid credentials!';
          return;
        }
        this.authService.setToken(response.token);
        this.router.navigate(['/todo']);
      },
      (error) => {
        console.error('Error while login:', error);
        this.errorRef.nativeElement.textContent =
          'Login failed. Please try again.';
      }
    );
  }

  clearError() {
    this.errorRef.nativeElement.textContent = "";
  }
}
