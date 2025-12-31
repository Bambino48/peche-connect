import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-seller-order-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './seller-order-detail.html',
  styleUrl: './seller-order-detail.scss',
})
export class SellerOrderDetailComponent implements OnInit {

  orderId!: number;

  order = {
    id: 1,
    created_at: '2025-12-20',
    order_status: 'En attente',
    total_price: 18500,
    delivery_address: 'Abidjan – Cocody',
    client: {
      full_name: 'Jean Dupont',
      phone: '0700000000',
      email: 'jean@email.com'
    },
    items: [
      {
        product_name: 'Thon rouge',
        quantity_kg: 2,
        unit_price: 2500,
        subtotal: 5000
      },
      {
        product_name: 'Sardine',
        quantity_kg: 5,
        unit_price: 2700,
        subtotal: 13500
      }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirmOrder() {
    this.order.order_status = 'Confirmée';
  }

  markAsDelivered() {
    this.order.order_status = 'Livrée';
  }
}
