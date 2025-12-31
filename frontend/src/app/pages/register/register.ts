import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class RegisterComponent {
  // Modèle du formulaire (aligné backend)
  formData = {
    fullName: '',
    phone: '',
    email: '',
    password: '',
    role: '',
  };

  submit() {
    console.log('Payload inscription :', this.formData);
  }
}
