import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-buyer-order-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-order-detail.html',
  styleUrl: './buyer-order-detail.scss',
})
export class BuyerOrderDetailComponent implements OnInit {

  orderId!: number;

  order = {
    id: 1,
    created_at: '2025-12-22',
    status: 'En cours',
    total: 2500,
    delivery_address: 'Abidjan – Cocody',
    payment_status: 'Payé',

    items: [
      {
        name: 'Thon rouge',
        quantity: 1,
        price: 2500,
      },
    ],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
