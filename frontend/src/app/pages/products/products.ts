import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
interface FishProductResponse {
  id: number;
  fishType?: string | null;
  otherFishName?: string | null;
  quantityKg?: number | null;
  pricePerKg?: number | null;
  fishingDate?: string | null;
  fishingZone?: string | null;
  conservationMethod?: string | null;
  photoUrl?: string | null;
  status?: string | null;
  createdAt?: string | null;
  sellerId?: number | null;
  sellerType?: string | null;
}

@Component({
  selector: 'app-products',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsComponent implements OnInit {
  products: FishProductResponse[] = [];
  displayedProducts: FishProductResponse[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  private async loadProducts(): Promise<void> {
    this.loading = this.products.length === 0;
    this.errorMessage = null;

    try {
      const token = localStorage.getItem('token');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch('http://localhost:8080/api/products', {
        headers,
      });

      if (!response.ok) {
        throw new Error('Erreur lors du chargement des produits.');
      }

      const data = (await response.json()) as FishProductResponse[];
      console.log('[ProductsComponent] Produits reçus du backend:', data);
      this.products = Array.isArray(data) ? data : [];
      this.displayedProducts = this.products.filter((product) => product.status === 'ACTIF');
    } catch (error) {
      console.error('[ProductsComponent] Error loading products:', error);
      this.errorMessage = 'Erreur lors du chargement des produits. Veuillez réessayer.';
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  get activeProducts(): FishProductResponse[] {
    return this.products.filter((product) => product.status === 'ACTIF');
  }

  getDisplayName(product: FishProductResponse): string {
    if (product.fishType === 'AUTRE' && product.otherFishName?.trim()) {
      return product.otherFishName.trim();
    }

    return product.fishType?.trim() || 'Poisson';
  }

  getPhotoSrc(product: FishProductResponse): string | null {
    const raw = product.photoUrl?.trim();
    if (!raw) {
      return null;
    }

    if (raw.startsWith('data:') || raw.startsWith('http://') || raw.startsWith('https://')) {
      return raw;
    }

    return `data:image/jpeg;base64,${raw}`;
  }

  formatDate(value?: string | null): string {
    if (!value) {
      return '—';
    }

    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return '—';
    }

    return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(parsed);
  }

  formatNumber(value?: number | null, suffix = ''): string {
    if (value === null || value === undefined || Number.isNaN(value)) {
      return '—';
    }

    const formatted = new Intl.NumberFormat('fr-FR', {
      maximumFractionDigits: 2,
    }).format(value);

    return `${formatted}${suffix}`;
  }
}
