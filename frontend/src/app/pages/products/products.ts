import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule, FormsModule],
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsComponent {

  products = [
  {
    id: 1,
    name_local: 'Thon rouge',
    name_scientific: 'Thunnus thynnus',
    fish_type: 'Poisson',
    fishing_zone: 'Atlantique',
    fishing_date: '2025-12-15',
    average_size: 40,
    quality_grade: 'A',
    conservation_method: 'Frais',
    halal: true,
    state: 'Disponible'
  },
  {
    id: 2,
    name_local: 'Sardine',
    name_scientific: 'Sardina pilchardus',
    fish_type: 'Poisson',
    fishing_zone: 'Méditerranée',
    fishing_date: '2025-12-10',
    average_size: 18,
    quality_grade: 'B',
    conservation_method: 'Congelé',
    halal: true,
    state: 'Indisponible'
  }
];

}
