import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProductsComponent } from './products/products.component';
import { FramesComponent } from './components/frame/frame.component';
import { LensesComponent } from './components/lenses/lenses.component';
import { GlassComponent } from './components/glass/glass.component';
import { SunglassComponent } from './components/sunglass/sunglass.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { LensesManagementComponent } from './components/admin/lenses-management/lenses-management.component';
import { GlassesManagementComponent } from './components/admin/glasses-management/glasses-management.component';
import { FramesManagementComponent } from './components/admin/frames-management/frames-management.component';
import { OrdersComponent } from './components/orders/orders.component';
//import { OrdersManagementComponent } from './components/admin/orders-management/orders-management.component';
import { OrdersManagementComponent } from './components/admin/orders-management/orders-management.component';
import { OrderdetailsManagementComponent } from './components/admin/orderdetails/orderdetails.component';
import { OrderhistoryComponent } from './components/orderhistory/orderhistory.component';
import { SunglassesManagementComponent } from './components/admin/sunglasses-management/sunglasses-management.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'frames', component: FramesComponent },
  { path: 'lenses', component: LensesComponent },
  { path: 'glasses', component: GlassComponent },
  { path: 'sunglasses', component: SunglassComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent },
  { path: 'orders', component: OrdersComponent },
  {path:'order-history',component:OrderhistoryComponent},
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard] // 🛡️ Protect Cart Page
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/lenses-management',
    component: LensesManagementComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/glasses-management',
    component: GlassesManagementComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'admin/frames-management',
    component: FramesManagementComponent,
    canActivate: [AdminGuard]
  },
  {path: 'admin/sunglasses-management',
    component:SunglassesManagementComponent,
    canActivate:[AdminGuard]
  },
  {
    path: 'admin/orders-management',
    component: OrdersManagementComponent,
    canActivate: [AdminGuard]
  },
  {
    path: 'adminOrders/:id',
    component: OrderdetailsManagementComponent,
    canActivate: [AdminGuard]
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
