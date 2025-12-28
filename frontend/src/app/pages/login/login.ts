import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class LoginComponent {
  phone = '';
  password = '';

  onSubmit() {
    const payload = {
      phone: this.phone,
      password: this.password,
    };

    console.log('Payload login :', payload);
  }
}
