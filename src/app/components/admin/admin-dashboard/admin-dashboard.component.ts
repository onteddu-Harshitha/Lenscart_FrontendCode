// import { Component } from '@angular/core';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-admin-dashboard',
//   templateUrl: './admin-dashboard.component.html',
//   styleUrls: ['./admin-dashboard.component.css']
// })
// export class AdminDashboardComponent {

  
//   constructor(private router: Router) {}


//  goTo(category: string): void {
//   const routesMap: { [key: string]: string } = {
//     lenses: '/admin/lenses-management',
//     frames: '/admin/frames-management',
//     glasses: '/admin/glasses-management',
//     sunglasses: '/admin/sunglasses-management'
//   };

//   const route = routesMap[category];
//   if (route) {
//     this.router.navigate([route]);
//   } else {
//     console.warn(`Unknown category: ${category}`);
//   }
// }
// ordersData = [
//     { name: 'Frames', value: 320 },
//     { name: 'Lenses', value: 280 },
//     { name: 'Glasses', value: 420 },
//     { name: 'Sunglasses', value: 225 }
//   ];

//   colorScheme = {
//     domain: ['#b2ebf2', '#c5cae9', '#ffe0b2', '#d1c4e9']
//   };
//   isVisible = true;

// toggleNavbar() {
//   this.isVisible = !this.isVisible;
// }


// }
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {
  outOfStockCount = 14;
  upcomingOrders = 7;
  weeklySales = 125000;

  newTask = '';
  todos = [
    { text: 'Call supplier', done: false },
    { text: 'Update inventory', done: true },
    { text: 'Check deliveries', done: false }
  ];

  recentOrders = [
    { customer: 'Amit Sharma', date: '2025-06-13', total: 2340 },
    { customer: 'Neha Verma', date: '2025-06-12', total: 1890 },
    { customer: 'Rahul Jain', date: '2025-06-11', total: 3100 }
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

ngOnInit() {
  this.generateCalendar(this.currentYear, this.currentMonth);
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


}
