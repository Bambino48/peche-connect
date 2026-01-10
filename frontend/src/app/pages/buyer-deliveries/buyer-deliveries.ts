import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-buyer-deliveries',
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-deliveries.html',
  styleUrl: './buyer-deliveries.scss',
})
export class BuyerDeliveriesComponent implements OnInit {

  /** 🔹 MOCK livraisons (table deliveries) */
  deliveries = [
    {
      id: 1,
      order_id: 12,
      delivery_person: 'Kouassi Yao',
      delivery_status: 'En route',
      delivery_time: 'Aujourd’hui à 16h30',
    },
    {
      id: 2,
      order_id: 10,
      delivery_person: 'Awa Traoré',
      delivery_status: 'Livrée',
      delivery_time: 'Hier à 11h00',
    },
    {
      id: 3,
      order_id: 8,
      delivery_person: 'Jean Koffi',
      delivery_status: 'En préparation',
      delivery_time: '—',
    },
  ];

  ngOnInit(): void {}

  /** 🔹 Classe CSS selon statut */
  getStatusClass(status: string): string {
    switch (status) {
      case 'En préparation':
        return 'preparing';
      case 'En route':
        return 'on-the-way';
      case 'Livrée':
        return 'delivered';
      default:
        return 'preparing';
    }
  }
}
