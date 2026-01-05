import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-buyer-delivery-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-delivery-detail.html',
  styleUrl: './buyer-delivery-detail.scss',
})
export class BuyerDeliveryDetailComponent implements OnInit {

  orderId!: number;

  /** 🔹 MOCK livraison (lié à la table deliveries) */
  delivery = {
    id: 1,
    delivery_person: 'Kouassi Yao',
    delivery_status: 'En route', // En préparation | En route | Livrée
    delivery_time: 'Aujourd’hui à 16h30',
    order_id: 1,
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
  }

  /** 🔹 Classe CSS selon le statut */
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
