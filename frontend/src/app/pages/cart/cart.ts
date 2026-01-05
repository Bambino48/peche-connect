import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class CartComponent implements OnInit {

  items: CartItem[] = [];

  constructor(private cart: CartService) {}

  ngOnInit(): void {
    this.items = this.cart.getItems();
  }

  updateQuantity(item: CartItem, quantity: number) {
    this.cart.updateQuantity(item.productId, quantity);
  }

  removeItem(productId: number) {
    this.cart.removeItem(productId);
    this.items = this.cart.getItems();
  }

  get total(): number {
    return this.cart.getTotal();
  }

  clearCart() {
    this.cart.clear();
    this.items = [];
  }
}
