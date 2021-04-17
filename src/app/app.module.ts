import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from "@angular/common";
import { HeaderComponent } from './featureComponent/header/header.component';
import { FooterComponent } from './featureComponent/footer/footer.component';
import { HomeComponent } from './featureComponent/home/home.component';
import { FoodComponent } from './featureComponent/productComponent/food/food.component';
import { RoomComponent } from './featureComponent/productComponent/room/room.component';
import { LaundryComponent } from './featureComponent/productComponent/laundry/laundry.component';
import { VehicleComponent } from './featureComponent/productComponent/vehicle/vehicle.component';
import { LoginComponent } from './featureComponent/user/login/login.component';
import { RegistrationComponent } from './featureComponent/user/registration/registration.component';
import { MyAccountComponent } from './featureComponent/user/tenant/my-account/my-account.component';
import { MyProfileComponent } from './featureComponent/user/my-profile/my-profile.component'; 
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './featureComponent/user/auth/auth.component';
import {HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptorInterceptor} from './interceptor/auth-interceptor.interceptor';
import { RouterModule } from '@angular/router';
import { OwnerDashboardComponent } from './featureComponent/user/owner/owner-dashboard/owner-dashboard.component';
import { TenantDashboardComponent } from './featureComponent/user/tenant/tenantdashboard/tenant-dashboard/tenant-dashboard.component';
import { FavouriteComponent } from './featureComponent/user/tenant/favourite/favourite/favourite.component';
import {AddPgComponent} from './featureComponent/user/owner/add-pg/add-pg.component';
import {PglistComponent} from './featureComponent/user/owner/pglist/pglist.component'
import {RoomDetailComponent} from './featureComponent/productComponent/room/room-detail/room-detail.component'
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FoodComponent,
    RoomComponent,
    LaundryComponent,
    VehicleComponent,
    LoginComponent,
    RegistrationComponent,
    MyAccountComponent,
    MyProfileComponent,
    AuthComponent,
    OwnerDashboardComponent,
    TenantDashboardComponent,
    FavouriteComponent,
    AddPgComponent,
    PglistComponent,
    RoomDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
