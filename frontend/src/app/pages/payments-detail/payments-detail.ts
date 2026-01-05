import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-payments-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payments-detail.html',
  styleUrl: './payments-detail.scss',
})
export class PaymentsDetailComponent implements OnInit {

  paymentId!: number;

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.paymentId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPayment(this.paymentId);
  }

  loadPayment(id: number) {
    if (id === 1) {
      this.payment = {
        id: 1,
        paid_at: '2025-12-22',
        payment_method: 'Mobile Money',
        payment_status: 'Payé',
        transaction_reference: 'TXN-458963',
        receipt_url: 'https://example.com/recu.pdf',
        amount: 18500,
        order_id: 101,
      };
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Payé':
      case 'PAYE':
        return 'paid';
      case 'En attente':
        return 'pending';
      case 'Échec':
      case 'ECHEC':
        return 'failed';
      default:
        return 'pending';
    }
  }
}
