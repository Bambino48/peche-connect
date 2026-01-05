import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payments.html',
  styleUrl: './payments.scss',
})
export class PaymentsComponent {

  payments = [
    {
      id: 1,
      paid_at: '2025-12-22',
      payment_method: 'Mobile Money',
      payment_status: 'Payé',
      transaction_reference: 'TXN-458963',
      receipt_url: '#',
      order_id: 1
    },
    {
      id: 2,
      paid_at: '2025-12-23',
      payment_method: 'Carte bancaire',
      payment_status: 'En attente',
      transaction_reference: 'TXN-785412',
      receipt_url: '#',
      order_id: 2
    }
  ];

}
