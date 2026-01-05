import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-delivery-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './delivery-detail.html',
  styleUrl: './delivery-detail.scss',
})
export class DeliveryDetailComponent implements OnInit {

  deliveryId!: number;

  delivery = {
    id: 0,
    order_id: 0,
    delivery_person: '',
    delivery_status: '',
    delivery_time: '',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.deliveryId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadDelivery(this.deliveryId);
  }

  loadDelivery(id: number) {
    // 🔹 MOCK TEMPORAIRE
    if (id === 1) {
      this.delivery = {
        id: 1,
        order_id: 101,
        delivery_person: 'Yao Konan',
        delivery_status: 'EN_COURS',
        delivery_time: '2025-01-02 14:00',
      };
    }
  }

  getStatusLabel(status: string): string {
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
