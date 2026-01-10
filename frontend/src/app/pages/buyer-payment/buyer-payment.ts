import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-payment.html',
  styleUrl: './buyer-payment.scss',
})
export class BuyerPaymentComponent {

  /** 🔹 MOCK (sera remplacé par backend) */
  order = {
    id: 1,
    total_price: 18500,
  };

  constructor(private router: Router) {}

  /** Paiement Mobile Money */
  payWithMobileMoney() {
    this.router.navigate(['/payment/confirm']);
  }

  /** Paiement Carte */
  payWithCard() {
    this.router.navigate(['/payment/confirm']);
  }

  /** Paiement à la livraison */
  payOnDelivery() {
    this.router.navigate(['/order-success', this.order.id]);
  }
}
