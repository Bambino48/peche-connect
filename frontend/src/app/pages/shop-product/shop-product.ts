import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-shop-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './shop-product.html',
  styleUrl: './shop-product.scss',
})
export class ShopProductComponent implements OnInit {

  productId!: number;

  product = {
    id: 0,
    name_local: '',
    name_scientific: '',
    fish_type: '',
    origin_type: '',
    fishing_zone: '',
    fishing_date: '',
    average_size: 0,
    quality_grade: '',
    conservation_method: '',
    halal: false,
    freshness_duration_hours: 0,
    unit_price: 0,
    available_weight_kg: 0,
    seller: '',
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(this.productId);
  }

  loadProduct(id: number) {
    // 🔹 MOCK TEMPORAIRE
    if (id === 1) {
      this.product = {
        id: 1,
        name_local: 'Thon rouge',
        name_scientific: 'Thunnus thynnus',
        fish_type: 'Poisson',
        origin_type: 'Mer',
        fishing_zone: 'Atlantique',
        fishing_date: '2025-12-15',
        average_size: 40,
        quality_grade: 'A',
        conservation_method: 'Frais',
        halal: true,
        freshness_duration_hours: 24,
        unit_price: 2500,
        available_weight_kg: 120,
        seller: 'Jean Pêcheur',
      };
    }
  }

}
