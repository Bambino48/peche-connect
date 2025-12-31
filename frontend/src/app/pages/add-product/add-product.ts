import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProductComponent {

  constructor(private router: Router) {}

  product = {
    name_local: '',
    name_scientific: '',
    fish_type: '',
    fishing_zone: '',
    fishing_date: '',
    average_size: '',
    quality_grade: '',
    conservation_method: '',
    halal: true,
    origin_type: '',
    seasonality: '',
    certifications: '',
    state: 'Disponible',
  };

  submitProduct() {
    console.log('Produit à enregistrer :', this.product);
    // backend plus tard
    this.router.navigate(['/products']);
  }

  goBack() {
    this.router.navigate(['/products']);
  }
}
