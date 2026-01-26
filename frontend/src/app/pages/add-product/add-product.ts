import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.html',
  styleUrl: './add-product.scss',
})
export class AddProductComponent {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvasElement') canvasElement?: ElementRef<HTMLCanvasElement>;
  productForm: FormGroup;
  isSubmitting = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  photoPreviewUrl: string | null = null;
  pendingPhotoDataUrl: string | null = null;
  photoSaved = false;
  isCameraOpen = false;
  private mediaStream: MediaStream | null = null;

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  private toastTimeoutId: ReturnType<typeof setTimeout> | null = null;

  constructor(
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
  ) {
    this.productForm = this.formBuilder.group({
      fishType: ['', [Validators.required]],
      otherFishName: [''],
      localFishName: [''],
      quantityKg: [null, [Validators.required, Validators.min(0.01)]],
      pricePerKg: [null, [Validators.required, Validators.min(0.01)]],
      fishingDate: ['', [Validators.required]],
      fishingZone: ['', [Validators.required]],
      conservationMethod: [''],
      photoUrl: ['', [Validators.required]],
      status: ['ACTIF', [Validators.required]],
    });

    this.productForm.get('fishType')?.valueChanges.subscribe((value) => {
      this.updateOtherFishNameValidator(value);
    });
  }

  submitProduct(): void {
    const quantityValue = Number(this.productForm.get('quantityKg')?.value ?? 0);
    const priceValue = Number(this.productForm.get('pricePerKg')?.value ?? 0);
    const photoUrlValue = String(this.productForm.get('photoUrl')?.value ?? '').trim();

    if (!this.photoSaved && !photoUrlValue) {
      this.errorMessage = 'Une photo du produit est obligatoire.';
      return;
    }

    if (
      this.productForm.invalid ||
      !Number.isFinite(quantityValue) ||
      quantityValue <= 0 ||
      !Number.isFinite(priceValue) ||
      priceValue <= 0
    ) {
      this.errorMessage = 'Tous les champs obligatoires doivent être renseignés et valides.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;
    this.successMessage = null;

    const payload = this.buildPayload();

    this.productService.createProduct(payload as unknown as Product).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Produit créé avec succès.';
        this.triggerToast('Produit créé avec succès.', 'success');

        this.productForm.reset({
          fishType: '',
          otherFishName: '',
          localFishName: '',
          quantityKg: null,
          pricePerKg: null,
          fishingDate: '',
          fishingZone: '',
          conservationMethod: '',
          photoUrl: '',
          status: 'ACTIF',
        });
        this.photoPreviewUrl = null;
        this.pendingPhotoDataUrl = null;
        this.photoSaved = false;
        this.stopCamera();

        setTimeout(() => this.router.navigate(['/products']), 1200);
      },
      error: (err) => {
        console.error('[AddProductComponent] Error creating product:', err);
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || 'Erreur lors de la création du produit.';
        const message = this.errorMessage ?? 'Erreur lors de la création du produit.';
        this.triggerToast(message, 'error');
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }

  private triggerToast(message: string, type: 'success' | 'error'): void {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    if (this.toastTimeoutId) {
      clearTimeout(this.toastTimeoutId);
    }

    this.toastTimeoutId = setTimeout(() => {
      this.showToast = false;
    }, 2500);
  }

  goBack() {
    this.router.navigate(['/products']);
  }

  async openCamera(): Promise<void> {
    this.errorMessage = null;
    if (!navigator.mediaDevices?.getUserMedia) {
      this.errorMessage = "La caméra n'est pas disponible sur cet appareil.";
      return;
    }

    this.pendingPhotoDataUrl = null;
    this.photoSaved = false;
    this.isCameraOpen = true;
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      this.video.nativeElement.srcObject = this.mediaStream;
      await this.video.nativeElement.play();
    } catch (error) {
      console.error('[AddProductComponent] Camera error:', error);
      this.errorMessage = "Impossible d'accéder à la caméra.";
      this.stopCamera();
    }
  }

  capturePhoto(): void {
    const video = this.video?.nativeElement;
    const canvas = this.canvasElement?.nativeElement;

    if (!video || !canvas) {
      return;
    }

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');
    if (!context) {
      return;
    }

    context.drawImage(video, 0, 0, width, height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    this.pendingPhotoDataUrl = dataUrl;
  }

  savePhoto(): void {
    if (!this.pendingPhotoDataUrl) {
      this.errorMessage = 'Veuillez capturer une photo avant de l’enregistrer.';
      return;
    }

    this.photoPreviewUrl = this.pendingPhotoDataUrl;
    this.productForm.patchValue({ photoUrl: this.pendingPhotoDataUrl });
    this.photoSaved = true;
    this.pendingPhotoDataUrl = null;
    this.stopCamera();
  }

  stopCamera(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    if (this.video?.nativeElement) {
      this.video.nativeElement.srcObject = null;
    }
    this.isCameraOpen = false;
  }

  private buildPayload(): {
    fishType: string;
    otherFishName?: string;
    localFishName?: string;
    quantityKg: number;
    pricePerKg: number;
    fishingDate: string;
    fishingZone: string;
    conservationMethod?: string;
    photoUrl: string;
    status: string;
  } {
    const formValue = this.productForm.value as {
      fishType: string;
      otherFishName: string;
      localFishName: string;
      quantityKg: number | string | null;
      pricePerKg: number | string | null;
      fishingDate: string;
      fishingZone: string;
      conservationMethod: string;
      photoUrl: string;
      status: string;
    };

    const quantityKg =
      typeof formValue.quantityKg === 'string'
        ? Number(formValue.quantityKg)
        : (formValue.quantityKg ?? 0);

    const pricePerKg = Number(formValue.pricePerKg ?? 0);

    const payload: {
      fishType: string;
      otherFishName?: string;
      localFishName?: string;
      quantityKg: number;
      pricePerKg: number;
      fishingDate: string;
      fishingZone: string;
      conservationMethod?: string;
      photoUrl: string;
      status: string;
    } = {
      fishType: formValue.fishType,
      quantityKg,
      pricePerKg,
      fishingDate: formValue.fishingDate,
      fishingZone: formValue.fishingZone,
      photoUrl: formValue.photoUrl,
      status: formValue.status,
    };

    if (formValue.fishType === 'AUTRE' && formValue.otherFishName?.trim()) {
      payload.otherFishName = formValue.otherFishName.trim();
    }

    if (formValue.localFishName?.trim()) {
      payload.localFishName = formValue.localFishName.trim();
    }

    if (formValue.conservationMethod) {
      payload.conservationMethod = formValue.conservationMethod;
    }

    payload.photoUrl = formValue.photoUrl.trim();

    return payload;
  }

  private updateOtherFishNameValidator(fishType: string | null): void {
    const otherFishControl = this.productForm.get('otherFishName');
    if (!otherFishControl) {
      return;
    }

    if (fishType === 'AUTRE') {
      otherFishControl.setValidators([Validators.required]);
    } else {
      otherFishControl.clearValidators();
      otherFishControl.setValue('');
    }

    otherFishControl.updateValueAndValidity({ emitEvent: false });
  }
}
