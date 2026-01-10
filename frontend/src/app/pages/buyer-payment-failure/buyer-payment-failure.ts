import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-payment-failure',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './buyer-payment-failure.html',
  styleUrl: './buyer-payment-failure.scss',
})
export class BuyerPaymentFailureComponent {}
