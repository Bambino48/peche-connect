import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './stock.html',
  styleUrl: './stock.scss',
})
export class StockComponent {

  stocks = [
  {
    id: 1,
    product_name: 'Thon rouge',
    availability_status: 'Disponible',
    available_weight_kg: 120,
    minimum_order_kg: 5,
    unit_price: 2500,
    freshness_duration_hours: 24
  },
  {
    id: 2,
    product_name: 'Sardine',
    availability_status: 'Indisponible',
    available_weight_kg: 0,
    minimum_order_kg: 10,
    unit_price: 2700,
    freshness_duration_hours: 12
  }
];


}
