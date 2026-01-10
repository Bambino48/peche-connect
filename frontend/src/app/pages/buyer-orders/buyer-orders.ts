import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-orders',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-orders.html',
  styleUrl: './buyer-orders.scss',
})
export class BuyerOrdersComponent implements OnInit {

  /** 🔹 MOCK commandes acheteur */
  orders = [
    {
      id: 1,
      created_at: '2026-01-03',
      total: 18500,
      status: 'En cours',
    },
    {
      id: 2,
      created_at: '2025-12-22',
      total: 2500,
      status: 'Livrée',
    },
  ];

  ngOnInit(): void {}

  /** 🔹 Classe CSS selon statut */
  getStatusClass(status: string): string {
    switch (status) {
      case 'En attente':
        return 'pending';
      case 'En cours':
        return 'processing';
      case 'Livrée':
        return 'delivered';
      case 'Annulée':
        return 'cancelled';
      default:
        return '';
    }
  }
}
