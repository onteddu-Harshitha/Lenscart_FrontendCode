// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-orderhistory',
//   templateUrl: './orderhistory.component.html',
//   styleUrls: ['./orderhistory.component.css']
// })
// export class OrderhistoryComponent {

// }


import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';

//import { FeedbackService, Feedback } from '../services/feedback.service';

export interface OrderItem {
    productName: string;
    imagePath: string;
    discountedPrice: number;
    quantity: number;
}

export interface Order {
    orderId: string;
    orderDateTime: string;
    orderStatus: string;
    totalAmount: number;
    items: OrderItem[];
}

@Component({
    selector: 'app-order-history',
    templateUrl: './orderhistory.component.html',
    styleUrls: ['./orderhistory.component.css']
})
export class OrderhistoryComponent implements OnInit {
    orders: Order[] = [];
    isLoading = false;
    errorMessage = '';
    ratings: { [orderId: string]: number } = {};
    constructor(
        private orderService: OrdersService,

    ) { }

    ngOnInit(): void {
        this.isLoading = true;
        this.orderService.getOrders().subscribe({
            next: (res) => {
                this.orders = res;
                this.isLoading = false;
                console.log(res);
            },
            error: () => {
                this.errorMessage = 'Failed to load orders.';
                this.isLoading = false;
            }
        });
    }

    // toggleOrder(orderId: string): void {
    //     this.expandedOrderId = this.expandedOrderId === orderId ? null : orderId;
    // }

    // enableFeedback(orderId: string): void {
    //     this.feedbackMode[orderId] = true;
    //     this.expandedOrderId = orderId;
    // }

    // rateOrder(orderId: string, rating: number): void {
    //     this.ratings[orderId] = rating;
    //     console.log(`Rated order ${orderId} with ${rating} stars`);
    // }

    // updateFeedback(orderId: string, feedback: string): void {
    //     this.feedbacks[orderId] = feedback;
    //     console.log(`Feedback for order ${orderId}: ${feedback}`);
    // }


}

