import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-my-orders',
  imports: [CommonModule, RouterModule],
  templateUrl: './mes-commandes.html',
  styleUrl: './mes-commandes.scss',
})
export class MesCommandesComponent {

  orders = [
    {
      id: 1,
      created_at: '2026-01-02',
      total_price: 2500,
      order_status: 'En attente',
    },
    {
      id: 2,
      created_at: '2026-01-01',
      total_price: 18500,
      order_status: 'Confirmée',
    },
    {
      id: 3,
      created_at: '2025-12-30',
      total_price: 32000,
      order_status: 'Livrée',
    },
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Livrée':
        return 'delivered';
      case 'Confirmée':
        return 'confirmed';
      default:
        return 'pending';
    }
  }
}
