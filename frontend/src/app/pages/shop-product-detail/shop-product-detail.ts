import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  standalone: true,
  selector: 'app-shop-product-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-product-detail.html',
  styleUrl: './shop-product-detail.scss',
})
export class ShopProductDetailComponent implements OnInit {

  productId!: number;

  product = {
    id: 1,
    name: 'Thon rouge',
    scientific_name: 'Thunnus thynnus',
    price: 2500,
    stock: 120,
    freshness: 24,
    seller: 'Jean Pêcheur',
    description:
      'Poisson frais pêché le jour même, idéal pour sashimi et grillades.',
    available: true,
  };

  /** 🔔 Toast */
  showToast = false;

  constructor(
    private route: ActivatedRoute,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
  }

  /** 🛒 Ajouter au panier + toast */
  addToCart() {
    this.cart.addItem({
      productId: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: 1,
    });

    this.triggerToast();
  }

  /** 🔔 Affichage temporaire du toast */
  private triggerToast() {
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }
}
