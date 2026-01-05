import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buyer-dashboard',
  imports: [CommonModule, RouterModule],
  standalone: true,
  templateUrl: './buyer-dashboard.html',
  styleUrl: './buyer-dashboard.scss',
})
export class BuyerDashboardComponent {

}
