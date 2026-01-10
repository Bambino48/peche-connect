import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class CheckoutComponent implements OnInit {

  items: CartItem[] = [];
  total = 0;
  deliveryAddress = '';

  constructor(
    private cart: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.items = this.cart.getItems();
    this.total = this.cart.getTotal();

    if (this.items.length === 0) {
      this.router.navigate(['/shop']);
    }
  }

  confirmOrder() {
    if (!this.deliveryAddress.trim()) {
      alert('Veuillez renseigner une adresse de livraison');
      return;
    }

    /** 🔹 MOCK création commande */
    const orderId = Math.floor(Math.random() * 1000) + 1;

    /** 🔹 Vider le panier */
    this.cart.clear();

    /** 🔹 Redirection vers confirmation */
    this.router.navigate(['/buyer-order-success', orderId]);
  }
}
