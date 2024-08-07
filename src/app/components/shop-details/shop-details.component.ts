import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ShopsService } from '../../services/shops.service';
import { Shop } from '../../interfaces/shop';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shop-details',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './shop-details.component.html',
  styleUrl: './shop-details.component.css'
})
export class ShopDetailsComponent implements OnInit, OnDestroy{

  id!: number;
  private sub: any;
  shop?: Shop;
  
  constructor(private route: ActivatedRoute, private shopsService: ShopsService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       // In a real app: dispatch action to load the details here.
       this.shopsService.getShopById(this.id).subscribe(data => {
        console.log(data);
        this.shop = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
