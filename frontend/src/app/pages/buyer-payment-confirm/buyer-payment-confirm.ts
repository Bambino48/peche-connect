import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-buyer-payment-confirm',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buyer-payment-confirm.html',
  styleUrl: './buyer-payment-confirm.scss',
})
export class BuyerPaymentConfirmComponent implements OnInit {

  /** 🔹 MOCK */
  orderId = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ⏳ Simulation du paiement
    setTimeout(() => {
      this.router.navigate(['/order-success', this.orderId]);
    }, 3000);
  }
}
