import { Component } from '@angular/core';
import { OrdersService } from 'src/app/services/orders.service';
 
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  outOfStockCount = 14;
  upcomingOrders = 7;
  weeklySales = 125000;
  revenuetoday = 0;
  recentOrders: any[] = [];
  noRecentOrdersMessage:string='';
 
 
  newTask = '';
  todos = [
    { text: 'Call supplier', done: false },
    { text: 'Update inventory', done: true },
    { text: 'Check deliveries', done: false }
  ];
 
 
 
  addTask() {
    if (this.newTask.trim()) {
      this.todos.push({ text: this.newTask.trim(), done: false });
      this.newTask = '';
    }
  }
 
  removeTask(task: any) {
    this.todos = this.todos.filter(t => t !== task);
  }
  days: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  currentMonth: number = new Date().getMonth();
  currentYear: number = new Date().getFullYear();
  calendarDays: Date[] = [];
 
  constructor(private orderService: OrdersService) { }
 
  ngOnInit() {
    this.generateCalendar(this.currentYear, this.currentMonth);
    this.orderService.getOrders().subscribe((orders: any[]) => {
 
     
      this.recentOrders = this.getRecentOrders(orders);
     
 
 
      if (this.recentOrders.length === 0) {
        this.noRecentOrdersMessage = 'No orders placed today.';
      }
    });
 
  }
 
  generateCalendar(year: number, month: number) {
    this.calendarDays = [];
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
 
    // Fill empty cells before 1st
    for (let i = 0; i < startDay; i++) {
      this.calendarDays.push(new Date(0)); // dummy dates
    }
 
    for (let i = 1; i <= lastDay.getDate(); i++) {
      this.calendarDays.push(new Date(year, month, i));
    }
  }
 
  prevMonth() {
    if (this.currentMonth === 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }
 
  nextMonth() {
    if (this.currentMonth === 11) {
      this.currentMonth = 0;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.generateCalendar(this.currentYear, this.currentMonth);
  }
 
  isToday(date: Date): boolean {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  }
  private getRecentOrders(orders: any[]): any[] {
    const today = new Date().toISOString().split('T')[0];
    console.log(orders)
    return orders.filter(order => {
      this.revenuetoday = order.totalAmount;
      const orderDate = new Date(order.orderDateTime).toISOString().split('T')[0];
      return orderDate === today;
    });
  }
 
}