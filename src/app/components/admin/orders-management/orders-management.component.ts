// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-orders-management',
//   templateUrl: './orders-management.component.html',
//   styleUrls: ['./orders-management.component.css']
// })
// export class OrdersManagementComponent {

// }


// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-ordermanagement',
//   templateUrl: './ordermanagement.component.html',
//   styleUrls: ['./ordermanagement.component.css']
// })
// export class OrdermanagementComponent {

// }


// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { OrderDTO, OrderService } from '../services/order-management.service';


// @Component({
//   selector: 'app-order-management',
//   templateUrl: './ordermanagement.component.html',
//   styleUrls: ['./ordermanagement.component.css']
// })
// export class OrdermanagementComponent implements OnInit {
//   orders: OrderDTO[] = [];

//   constructor(private orderService: OrderService, private router: Router) { }

//   ngOnInit(): void {
//     this.orderService.getAllOrders().subscribe(data => this.orders = data);
//   }

//   viewOrder(id: number): void {
//     this.router.navigate(['/adminOrders', id]);
//   }
// }



// import { Component, OnInit } from '@angular/core';

// import { Router } from '@angular/router';
// import { Customer, CustomerService } from 'src/app/services/customer.service';
// import { OrderDTO, OrdermanagementService } from 'src/app/services/ordermanagement.service';

// @Component({
//   selector: 'app-order-management',
//   templateUrl: './orders-management.component.html',
//   styleUrls: ['./orders-management.component.css']
// })
// export class OrdermanagementComponent implements OnInit {
//   orders: OrderDTO[] = [];
//   filteredOrders: OrderDTO[] = [];
//   customer!: Customer;

//   searchEmail: string = '';
//   statusFilter: string = '';

//   constructor(private orderService: OrdermanagementService, private router: Router, private cust: CustomerService) { }

//   ngOnInit(): void {

//     const customerId = 4; // Replace with dynamic ID as needed
//     this.cust.getCustomerById(customerId).subscribe(data => {
//       this.customer = data;


//     })
//     this.fetchOrders();
//   }

//   fetchOrders(): void {
//     this.orderService.getAllOrders().subscribe((data: OrderDTO[]) => {
//       this.orders = data;
//       this.applyFilters();
//     });
//   }

//   applyFilters(): void {
//     this.filteredOrders = this.orders.filter(order => {
//       //const matchesEmail = order.customerEmail.toLowerCase().includes(this.searchEmail.toLowerCase());
//       const matchesStatus = this.statusFilter ? order.orderStatus === this.statusFilter : true;
//       return matchesStatus;
//     });
//   }
//   viewOrder(id: number): void {
//     this.router.navigate(['/adminOrders', id]);
//   }
// }

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer, CustomerService } from 'src/app/services/customer.service';
import { OrderDTO, OrdermanagementService } from 'src/app/services/ordermanagement.service';

@Component({
  selector: 'app-order-management',
  templateUrl: './orders-management.component.html',
  styleUrls: ['./orders-management.component.css']
})
export class OrdersManagementComponent implements OnInit {
  orders: OrderDTO[] = [];
  filteredOrders: OrderDTO[] = [];
  customersMap: Map<number, Customer> = new Map();

  searchEmail: string = '';
  statusFilter: string = '';

  constructor(
    private orderService: OrdermanagementService,
    private router: Router,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders(): void {
    this.orderService.getAllOrders().subscribe((data: OrderDTO[]) => {
      this.orders = data;
      this.applyFilters();

      // Fetch customer details for each order
      const uniqueCustomerIds = [...new Set(this.orders.map(order => order.customerId))];
      uniqueCustomerIds.forEach(id => {
        this.customerService.getCustomerById(id).subscribe(customer => {
          this.customersMap.set(id, customer);
        });
      });
    });
  }

  applyFilters(): void {
    this.filteredOrders = this.orders.filter(order => {
      const matchesStatus = this.statusFilter ? order.orderStatus === this.statusFilter : true;
      return matchesStatus;
    });
  }

  getCustomerName(customerId: number): string {
    const customer = this.customersMap.get(customerId);
    return customer ? customer.name : 'Loading...';
  }

  viewOrder(id: number): void {
    this.router.navigate(['/adminOrders', id]);
  }
}
