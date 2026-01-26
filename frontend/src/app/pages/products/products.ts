import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.products$;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.productService.loadProducts().subscribe({
      next: () => {
        this.isLoading = false;
      },
      error: (err) => {
        console.error('[ProductsComponent] Error loading products:', err);
        this.isLoading = false;
        this.errorMessage =
          err?.error?.message || 'Erreur lors du chargement des produits. Veuillez réessayer.';
      },
    });
  }
}
