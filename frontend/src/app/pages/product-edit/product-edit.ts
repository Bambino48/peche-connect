import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  imports: [CommonModule, FormsModule, RouterModule],
  standalone: true,
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.scss',
})
export class ProductEditComponent implements OnInit {

  productId!: number;

  product = {
    id: 0,
    name_local: '',
    name_scientific: '',
    fish_type: '',
    fishing_zone: '',
    fishing_date: '',
    average_size: 0,
    quality_grade: '',
    conservation_method: '',
    halal: false,
    state: '',
  };


  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(this.productId);
  }

  loadProduct(id: number) {

    const mockProducts = [
      {
        id: 1,
        name_local: 'Thon rouge',
        name_scientific: 'Thunnus thynnus',
        fish_type: 'Poisson',
        fishing_zone: 'Atlantique',
        fishing_date: '2025-12-15',
        average_size: 40,
        quality_grade: 'A',
        conservation_method: 'Frais',
        halal: true,
        state: 'Disponible'
      },
      {
        id: 2,
        name_local: 'Sardine',
        name_scientific: 'Sardina pilchardus',
        fish_type: 'Poisson',
        fishing_zone: 'Méditerranée',
        fishing_date: '2025-12-10',
        average_size: 18,
        quality_grade: 'B',
        conservation_method: 'Congelé',
        halal: true,
        state: 'Indisponible'
      }
    ];

    const foundProduct = mockProducts.find(p => p.id === id);

    if (foundProduct) {
      this.product = { ...foundProduct }; // clone sécurisé
    }
  }

  updateProduct() {
    console.log('Produit mis à jour :', this.product);
  }
}
