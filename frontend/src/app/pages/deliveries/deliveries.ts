import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Delivery {
  id: number;
  delivery_person: string;
  delivery_status: string;
  delivery_time: string;
  order_id: number;
}

@Component({
  selector: 'app-deliveries',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './deliveries.html',
  styleUrl: './deliveries.scss',
})
export class DeliveriesComponent implements OnInit {

  deliveries: Delivery[] = [];

  ngOnInit(): void {
    this.loadDeliveries();
  }

  loadDeliveries() {
    // 🔹 MOCK TEMPORAIRE
    this.deliveries = [
      {
        id: 1,
        delivery_person: 'Kouassi Yao',
        delivery_status: 'En cours',
        delivery_time: '2025-12-26 14:30',
        order_id: 1,
      },
      {
        id: 2,
        delivery_person: 'Traoré Moussa',
        delivery_status: 'Livrée',
        delivery_time: '2025-12-25 10:00',
        order_id: 2,
      },
    ];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Livrée':
        return 'delivered';
      case 'En cours':
        return 'in-progress';
      case 'Annulée':
        return 'cancelled';
      default:
        return 'pending';
    }
  }
}
