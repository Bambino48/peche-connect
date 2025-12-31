import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class OrdersComponent {

  orders = [
    {
      id: 1,
      created_at: '2025-12-20',
      client_name: 'Jean Dupont',
      total_price: 18500,
      order_status: 'En attente'
    },
    {
      id: 2,
      created_at: '2025-12-21',
      client_name: 'Marie Konan',
      total_price: 6200,
      order_status: 'Confirmée'
    },
    {
      id: 3,
      created_at: '2025-12-22',
      client_name: 'Paul Yao',
      total_price: 41200,
      order_status: 'Livrée'
    }
  ];

}
