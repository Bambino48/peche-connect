import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-buyer-payment-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-payment-detail.html',
  styleUrl: './buyer-payment-detail.scss',
})
export class BuyerPaymentDetailComponent implements OnInit {

  paymentId!: number;

  /** 🔹 MOCK paiement (table payments) */
  payment = {
    id: 0,
    paid_at: '',
    payment_method: '',
    payment_status: '',
    transaction_reference: '',
    receipt_url: '',
    amount: 0,
    order_id: 0,
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPayment(this.paymentId);
  }

  loadPayment(id: number) {
    // 🔹 MOCK TEMPORAIRE
    this.payment = {
      id,
      paid_at: '2026-01-04',
      payment_method: 'Mobile Money',
      payment_status: 'Payé',
      transaction_reference: 'TXN-785412',
      receipt_url: 'https://example.com/recu.pdf',
      amount: 18500,
      order_id: 12,
    };
  }

  /** 🔹 Classe CSS sécurisée */
  getStatusClass(status: string): string {
    switch (status) {
      case 'Payé':
        return 'paid';
      case 'En attente':
        return 'pending';
      case 'Échec':
        return 'failed';
      default:
        return 'pending';
    }
  }
}
