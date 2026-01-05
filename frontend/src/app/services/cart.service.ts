import { Injectable } from '@angular/core';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private items: CartItem[] = [];

  getItems(): CartItem[] {
    return this.items;
  }

  addItem(item: CartItem) {
      console.log('PANIER AVANT:', this.items);
    const existing = this.items.find(i => i.productId === item.productId);

    if (existing) {
      existing.quantity += item.quantity;
    } else {
      this.items.push(item);
    }
      console.log('PANIER APRÈS:', this.items);
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.items.find(i => i.productId === productId);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  }

  removeItem(productId: number) {
    this.items = this.items.filter(i => i.productId !== productId);
  }

  getTotal(): number {
    return this.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  clear() {
    this.items = [];
  }
}
