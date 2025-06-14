import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { Glass, GlassService } from 'src/app/services/glass.service';

@Component({
  selector: 'app-glasses',
  templateUrl: './glass.component.html',
  styleUrls: ['./glass.component.css']
})
export class GlassComponent implements OnInit {

  glasses: Glass[] = [];
  filteredGlasses: Glass[] = [];

  selectedBrand = '';
  selectedType = '';
  selectedPriceRange = '';

  brands: string[] = [];
  types: string[] = [];

  constructor(private glassService: GlassService, private cartservice: CartService, private router: Router) { }

  ngOnInit(): void {
    this.glassService.getAllGlasses().subscribe(data => {
      this.glasses = data;
      this.filteredGlasses = [...this.glasses];

      this.brands = [...new Set(this.glasses.map(g => g.brand))];
      this.types = [...new Set(this.glasses.map(g => g.type))];
    });
  }

  applyFilters(): void {
    this.filteredGlasses = this.glasses.filter(glass => {
      const matchBrand = this.selectedBrand ? glass.brand === this.selectedBrand : true;
      const matchType = this.selectedType ? glass.type === this.selectedType : true;
      const matchPrice =
        this.selectedPriceRange === 'below1000' ? glass.price < 1000 :
          this.selectedPriceRange === '1000to2000' ? glass.price >= 1000 && glass.price <= 2000 :
            this.selectedPriceRange === 'above2000' ? glass.price > 2000 : true;

      return matchBrand && matchType && matchPrice;
    });
  }

  // addToCart(glass: Glass): void {
  //   console.log('Add to cart:', glass);
  //   // Add cart logic here
  // }

  // addToCart(customerId: number, item: { productId: string; quantity: number; price: number }): Observable<any> {
  //   return this.cartservice.addToCart(customerId, item);
  // }

  addToCart(glass: Glass): void {
    const idFromStorage = localStorage.getItem("customerId");
    const customerId = idFromStorage ? Number(idFromStorage) : null;

    if (!customerId) {
      this.router.navigate(['/login']);
      return;
    }

    const cartItem = {
      customerId: customerId,
      productId: glass.glassId,     // or glass.productId depending on your model
      quantity: 1,
      price: glass.price
    };

    console.log('Adding to cart:', cartItem);

    this.cartservice.addToCart(cartItem).subscribe(
      (response) => {
        console.log('Item added to cart successfully:', response);
        // Optionally show a success message or update cart UI
      },
      (error) => {
        console.error('Error adding item to cart:', error);
        // Optionally show an error message
      }
    );
  }


}
