import { Component, ElementRef, ViewChild } from "@angular/core";
import { Router, RouterModule } from '@angular/router';
import { AuthService } from "../../services/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  email = '';
  password = '';
  userName = '';
  errorText = '';

  @ViewChild('errorRef') errorRef!: ElementRef<HTMLDivElement>;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.email.trim() || !this.password.trim() || !this.userName.trim()) {
      this.errorRef.nativeElement.textContent =
        'Email, password and user name are required!';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorRef.nativeElement.textContent = 'Invalid email format!';
      return;
    }

    this.authService.signup(this.email, this.password, this.userName).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error while signup:', error);
        if (!error.success) {
          this.errorRef.nativeElement.textContent = 'User already exists!';
          return;
        }
      }
    );
  }

  clearError() {
    this.errorRef.nativeElement.textContent = '';
  }
}
