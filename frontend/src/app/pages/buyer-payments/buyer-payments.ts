import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-payments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-payments.html',
  styleUrl: './buyer-payments.scss',
})
export class BuyerPaymentsComponent implements OnInit {

  payments = [
    {
      id: 1,
      paid_at: '2026-01-03',
      payment_method: 'Mobile Money',
      amount: 18500,
      status: 'Payé',
      order_id: 12,
    },
    {
      id: 2,
      paid_at: '2026-01-01',
      payment_method: 'Carte bancaire',
      amount: 9200,
      status: 'Échec',
      order_id: 10,
    },
  ];

  ngOnInit(): void {}

  getStatusClass(status: string): string {
    switch (status) {
      case 'Payé':
        return 'paid';
      case 'Échec':
        return 'failed';
      default:
        return 'pending';
    }
  }
}
