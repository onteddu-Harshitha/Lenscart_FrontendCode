// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-orderdetails',
//   templateUrl: './orderdetails.component.html',
//   styleUrls: ['./orderdetails.component.css']
// })
// export class OrderdetailsComponent {

// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { OrderDTO, OrdermanagementService } from 'src/app/services/ordermanagement.service';




// @Component({
//   selector: 'app-order-detail',
//   templateUrl: './orderdetails.component.html',
//   styleUrls: ['./orderdetails.component.css']
// })
// export class OrderdetailsManagementComponent implements OnInit {
//   order!: OrderDTO;


//   message = '';


//   constructor(private route: ActivatedRoute, private orderService: OrdermanagementService) { }


//   ngOnInit(): void {
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     this.orderService.getOrderById(id).subscribe({
//       next: (order) => {
//         this.order = order;

//       },
//       error: (err) => {
//         console.error('Error loading order', err);

//       }
//     });
//   }




//   updateStatus(): void {
//     this.orderService.updateOrderStatusBulk(
//       [this.order.orderId],
//       this.order.orderStatus
//     ).subscribe({
//       next: () => {
//         this.showToast('Status updated successfully!', 'success');
//       },
//       error: (err) => {
//         if (err.status === 200) {
//           this.showToast('Status updated successfully!', 'success');
//         } else {
//           console.error('❌ Error updating status:', err);
//           this.showToast('⚠️ Something went wrong, but status update attempted.', 'error');
//         }
//       },
//       complete: () => {
//         console.log('Update status request completed.');
//       }
//     });
//   }

//   showToast(message: string, type: 'success' | 'error') {
//     const toast = document.getElementById('toast');
//     if (toast) {
//       toast.textContent = message;
//       toast.className = `toast show ${type}`;
//       setTimeout(() => {
//         toast.className = 'toast';
//       }, 3000);
//     }
//   }



// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDTO, OrdermanagementService } from 'src/app/services/ordermanagement.service';
import { Customer, CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsManagementComponent implements OnInit {
  order!: OrderDTO;
  customer!: Customer;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdermanagementService,
    private customerService: CustomerService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.orderService.getOrderById(id).subscribe({
      next: (order) => {
        this.order = order;
        this.fetchCustomer(order.customerId);
      },
      error: (err) => {
        console.error('Error loading order', err);
      }
    });
  }

  fetchCustomer(customerId: number): void {
    this.customerService.getCustomerById(customerId).subscribe({
      next: (customer) => {
        this.customer = customer;
      },
      error: (err) => {
        console.error('Error loading customer', err);
      }
    });
  }

  updateStatus(): void {
    this.orderService.updateOrderStatusBulk(
      [this.order.orderId],
      this.order.orderStatus
    ).subscribe({
      next: () => {
        this.showToast('Status updated successfully!', 'success');
      },
      error: (err) => {
        if (err.status === 200) {
          this.showToast('Status updated successfully!', 'success');
        } else {
          console.error('❌ Error updating status:', err);
          this.showToast('⚠️ Something went wrong, but status update attempted.', 'error');
        }
      },
      complete: () => {
        console.log('Update status request completed.');
      }
    });
  }

  showToast(message: string, type: 'success' | 'error') {
    const toast = document.getElementById('toast');
    if (toast) {
      toast.textContent = message;
      toast.className = `toast show ${type}`;
      setTimeout(() => {
        toast.className = 'toast';
      }, 3000);
    }
  }
}

