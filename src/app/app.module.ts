import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';
import { AboutComponent } from './components/about/about.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProductsComponent } from './products/products.component';
import { FramesComponent } from './components/frame/frame.component';
import { LensesComponent } from './components/lenses/lenses.component';
import { GlassComponent } from './components/glass/glass.component';
import { SunglassComponent } from './components/sunglass/sunglass.component';
import { ProductComponent } from './components/product/product.component';

import { CartComponent } from './components/cart/cart.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { LensesManagementComponent } from './components/admin/lenses-management/lenses-management.component';
import { GlassesManagementComponent } from './components/admin/glasses-management/glasses-management.component';
import { SunglassesManagementComponent } from './components/admin/sunglasses-management/sunglasses-management.component';
import { FramesManagementComponent } from './components/admin/frames-management/frames-management.component';
import { OrdersComponent } from './components/orders/orders.component';
import { AdminNavbarComponent } from './components/admin/admin-navbar/admin-navbar.component';
import { OrdersManagementComponent } from './components/admin/orders-management/orders-management.component';
import { OrderdetailsManagementComponent } from './components/admin/orderdetails/orderdetails.component';
import { OrderhistoryComponent } from './components/orderhistory/orderhistory.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//import { OrdermanagementComponent } from './components/admin/orders-management/orders-management.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    AboutComponent,
    FooterComponent,
    HeaderComponent,
    ProductsComponent,
    FramesComponent,
    GlassComponent,
    SunglassComponent,
    ProductComponent,
    LensesComponent,
    CartComponent,
    LoginComponent,
    SignupComponent,
    AdminDashboardComponent,
    LensesManagementComponent,
    GlassesManagementComponent,
    SunglassesManagementComponent,
    FramesManagementComponent,
    OrdersComponent,
    AdminNavbarComponent,
   OrdersManagementComponent,
    OrderdetailsManagementComponent,
    OrderhistoryComponent
    //OrdermanagementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }