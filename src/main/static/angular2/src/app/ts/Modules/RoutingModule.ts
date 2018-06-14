import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderComponent } from '../Components/OrderComponent';
import { OrderListComponent } from '../Components/OrderListComponent';
import { OrderDashboardComponent } from '../Components/OrderDashboardComponent';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(
            RoutingModule.appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ]
})
export class RoutingModule {


    static appRoutes: Routes = [
        { path: 'newOrder/:id', component: OrderComponent },
        { path: 'orders', component: OrderListComponent },
        { path: 'orders?orderNumber=', component: OrderListComponent },
        { path: '', component: OrderDashboardComponent }
    ];
}
