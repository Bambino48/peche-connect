import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-notifications',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-notifications.html',
  styleUrl: './buyer-notifications.scss',
})
export class BuyerNotificationsComponent {

  /** 🔔 MOCK notifications acheteur */
  notifications = [
    {
      id: 1,
      type: 'order',
      title: 'Commande confirmée',
      message: 'Votre commande #12 a été confirmée',
      created_at: '05 Jan 2026 • 10:30',
      link: '/my-orders/12',
      read: false,
    },
    {
      id: 2,
      type: 'payment',
      title: 'Paiement reçu',
      message: 'Paiement de 18 500 FCFA reçu',
      created_at: '05 Jan 2026 • 10:32',
      link: '/my-payments/5',
      read: true,
    },
    {
      id: 3,
      type: 'delivery',
      title: 'Livraison en route',
      message: 'Votre commande est en cours de livraison',
      created_at: '05 Jan 2026 • 14:00',
      link: '/delivery/12',
      read: false,
    },
  ];

}
