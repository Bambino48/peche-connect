import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface PackagingDelivery {
  packaging_type: string;
  delivery_zone: string;
  delivery_fee: number;
  delivery_delay: string;
  delay_policy: string;
  pickup_available: boolean;
}

interface Delivery {
  id: number;
  order_id: number;
  delivery_person: string;
  delivery_status: 'EN_ATTENTE' | 'EN_COURS' | 'LIVREE';
  delivery_time: string;
}

@Component({
  selector: 'app-delivery-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './delivery-settings.html',
  styleUrl: './delivery-settings.scss',
})
export class DeliverySettingsComponent {

  /** 🔹 PARAMÈTRES LIVRAISON (MOCK) */
  packaging: PackagingDelivery = {
    packaging_type: 'Isotherme',
    delivery_zone: 'Abidjan',
    delivery_fee: 2000,
    delivery_delay: '24h',
    delay_policy: 'Remboursement partiel en cas de retard',
    pickup_available: true,
  };

  /** 🔹 LIVRAISONS (MOCK) */
  deliveries: Delivery[] = [
    {
      id: 1,
      order_id: 101,
      delivery_person: 'Yao Konan',
      delivery_status: 'EN_ATTENTE',
      delivery_time: '2025-01-02 14:00',
    },
    {
      id: 2,
      order_id: 102,
      delivery_person: 'Livreur Express',
      delivery_status: 'EN_COURS',
      delivery_time: '2025-01-01 18:30',
    },
  ];

  savePackaging() {
    console.log('Paramètres livraison enregistrés :', this.packaging);
  }

  getStatusLabel(status: Delivery['delivery_status']): string {
    switch (status) {
      case 'EN_ATTENTE':
        return 'En attente';
      case 'EN_COURS':
        return 'En cours';
      case 'LIVREE':
        return 'Livrée';
      default:
        return status;
    }
  }
}
