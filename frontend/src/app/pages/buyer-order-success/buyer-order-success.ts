import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-order-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-order-success.html',
  styleUrl: './buyer-order-success.scss',
})
export class BuyerOrderSuccessComponent implements OnInit {

  orderId!: number;

  order = {
    id: 0,
    created_at: '',
    total_price: 0,
    delivery_address: '',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderId = Number(this.route.snapshot.paramMap.get('orderId'));
    this.loadOrder(this.orderId);
  }

  loadOrder(id: number) {
    this.order = {
      id,
      created_at: '2026-01-03',
      total_price: 18500,
      delivery_address: 'Abidjan – Cocody',
    };
  }
}
