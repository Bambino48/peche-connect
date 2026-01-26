import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

export interface Product {
  id?: number;
  nomLocal: string;
  nomScientifique: string;
  typeProduit: string;
  zonePeche: string;
  datePeche: string;
  tailleMoyenne: number | null;
  qualite: string;
  modeConservation: string;
  halal: boolean;
  origine: string;
  saisonnalite: string;
  certifications: string;
  etatProduit: string;
}

interface ProductResponse {
  id: number;
  nomLocal: string;
  nomScientifique: string;
  typeProduit: string;
  zonePeche: string;
  datePeche: string;
  tailleMoyenne: number | null;
  qualite: string;
  modeConservation: string;
  halal: boolean;
  origine: string;
  saisonnalite: string;
  certifications: string;
  etatProduit: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly API_URL = 'http://localhost:8080/api/products';
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadProducts(): Observable<Product[]> {
    return this.http.get<ProductResponse[]>(this.API_URL).pipe(
      map((responses) => responses.map((response) => this.mapToProduct(response))),
      tap((products) => this.productsSubject.next(products)),
      catchError((error) => {
        console.error('ProductService - Erreur loadProducts:', error);
        throw error;
      }),
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.API_URL, product).pipe(
      tap((createdProduct) => {
        const current = this.productsSubject.value;
        this.productsSubject.next([createdProduct, ...current]);
      }),
      catchError((error) => {
        console.error('ProductService - Erreur createProduct:', error);
        throw error;
      }),
    );
  }

  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.API_URL}/${id}`, product).pipe(
      tap((updatedProduct) => {
        const current = this.productsSubject.value;
        const updated = current.map((p) => (p.id === id ? updatedProduct : p));
        this.productsSubject.next(updated);
      }),
      catchError((error) => {
        console.error('ProductService - Erreur updateProduct:', error);
        throw error;
      }),
    );
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`).pipe(
      tap(() => {
        const current = this.productsSubject.value;
        this.productsSubject.next(current.filter((p) => p.id !== id));
      }),
      catchError((error) => {
        console.error('ProductService - Erreur deleteProduct:', error);
        throw error;
      }),
    );
  }

  private mapToProduct(response: ProductResponse): Product {
    return {
      id: response.id,
      nomLocal: response.nomLocal,
      nomScientifique: response.nomScientifique,
      typeProduit: response.typeProduit,
      zonePeche: response.zonePeche,
      datePeche: response.datePeche,
      tailleMoyenne: response.tailleMoyenne,
      qualite: response.qualite,
      modeConservation: response.modeConservation,
      halal: response.halal,
      origine: response.origine,
      saisonnalite: response.saisonnalite,
      certifications: response.certifications,
      etatProduit: response.etatProduit,
    };
  }
}
