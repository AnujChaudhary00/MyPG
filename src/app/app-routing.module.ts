import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './featureComponent/home/home.component';
import {RoomComponent} from './featureComponent/productComponent/room/room.component';
import {FoodComponent} from './featureComponent/productComponent/food/food.component';
import {VehicleComponent} from './featureComponent/productComponent/vehicle/vehicle.component';
import {LaundryComponent} from './featureComponent/productComponent/laundry/laundry.component';
import {LoginComponent} from './featureComponent/user/login/login.component';
import {RegistrationComponent} from './featureComponent/user/registration/registration.component'
import {MyProfileComponent} from './featureComponent/user/my-profile/my-profile.component';
import{RouterGuardGuard} from './routeGuard/router-guard.guard';
import{OwnerGuard} from './routeGuard/owner-guard/owner.guard';
import {OwnerDashboardComponent} from './featureComponent/user/owner/owner-dashboard/owner-dashboard.component';
import {AddPgComponent} from './featureComponent/user/owner/add-pg/add-pg.component';
import {PglistComponent} from './featureComponent/user/owner/pglist/pglist.component';
import { TenantListComponent } from './featureComponent/user/owner/tenant-list/tenant-list.component';
import {TenantDashboardComponent} from './featureComponent/user/tenant/tenantDashboard/tenant-dashboard/tenant-dashboard.component';
import {MyAccountComponent} from './featureComponent/user/tenant/my-account/my-account.component';
import {FavouriteComponent} from './featureComponent/user/tenant/favourite/favourite/favourite.component';
import {CancelBookingComponent} from './featureComponent/user/tenant/cancel-booking/cancel-booking.component';
import {TenantGuard} from './routeGuard/tenant-guard/tenant.guard';
import {RoomDetailComponent} from './featureComponent/productComponent/room/room-detail/room-detail.component';
import { from } from 'rxjs';
import { BookingPageComponent } from './featureComponent/productComponent/room/booking-page/booking-page.component';
import { GrivencesComponent } from './featurecomponent/user/owner/grivences/grivences.component';
import { ForgotComponent } from './featureComponent/user/forgot/forgot.component';

const routes: Routes = [
  {
    path:'', redirectTo:'home',
    pathMatch:'full'
  },
  {
    path:'login',
    children:[
      {
        path:'login/:id',
        component:LoginComponent
      },
      {
        path:"**",
        component:LoginComponent
      }
    ]
  },
  {
    path:'forgot-password',
    component:ForgotComponent
  },
  {
    path:'registration',
    component:RegistrationComponent
  },
  {
    path:'home',
   component:HomeComponent
  },
  {
    path:'user',
    component:MyAccountComponent
  },
  {
    path:'dashboard',
    component:OwnerDashboardComponent,
    children:[
      {
        path:'my-profile',
        component:MyProfileComponent
      },
      {
        path:'add-PG',
        component:AddPgComponent
      },
      {
        path:'pg-List',
        component:PglistComponent
      },
      {
        path:'tenants',
        component:TenantListComponent
      },
      {
        path:'grivences',
        component:GrivencesComponent
      }
    ],
    canActivate:[OwnerGuard]
  },
  {
    path:'tenant-dashboard',
    component:TenantDashboardComponent,
    children:[
      {
        path:'my-account',
        component:MyAccountComponent
      },
      {
        path:'favourite',
        component:FavouriteComponent
      },
      {
        path:'my-profile',
        component:MyProfileComponent
      },
      {
        path:'cancel-booking',
        component:CancelBookingComponent
      }
    ],
    canActivate:[TenantGuard]
  },
  {
    path:'room',
    children:[
      {
        path:'check/:id',
        children:[
          {
          path:'book',
          component:BookingPageComponent,
          canActivate:[RouterGuardGuard]
          },
          {
            path:"**",
            component:RoomDetailComponent,
          }
        ]
      },
      {
        path:"**",
        component:RoomComponent
      }
    ]
  },
  {
    path:'food',
    component:FoodComponent
  },
  {
    path:'vehicle',
    component:VehicleComponent
  },
  {
    path:'laundry',
    component:LaundryComponent
  },
  {
    path:"**",
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
