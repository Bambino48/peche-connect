import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop.html',
  styleUrl: './shop.scss',
})
export class ShopComponent {

  products = [
    {
      id: 1,
      name_local: 'Thon rouge',
      name_scientific: 'Thunnus thynnus',
      price: 2500,
      available_weight_kg: 120,
      unit: 'kg',
      freshness: 24,
      seller: 'Jean Pêcheur',
      availability_status: 'Disponible',
    },
    {
      id: 2,
      name_local: 'Sardine',
      name_scientific: 'Sardina pilchardus',
      price: 1500,
      available_weight_kg: 0,
      unit: 'kg',
      freshness: 12,
      seller: 'Marie Pêcheuse',
      availability_status: 'Indisponible',
    },
  ];

}
