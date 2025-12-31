import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';

@Component({
  selector: 'app-stock-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './stock-edit.html',
  styleUrl: './stock-edit.scss',
})
export class StockEditComponent implements OnInit {

  stockId!: number;

  stock = {
    product_name: '',
    availability_status: 'Disponible',
    available_weight_kg: 0,
    minimum_order_kg: 0,
    unit_price: 0,
    freshness_duration_hours: 0,
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.stockId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStock(this.stockId);
  }

  loadStock(id: number) {
    // 🔹 MOCK (temporaire)
    if (id === 1) {
      this.stock = {
        product_name: 'Thon rouge',
        availability_status: 'Disponible',
        available_weight_kg: 120,
        minimum_order_kg: 5,
        unit_price: 2500,
        freshness_duration_hours: 24,
      };
    }
  }

  updateStock() {
    console.log('Stock mis à jour :', this.stock);
  }
}
