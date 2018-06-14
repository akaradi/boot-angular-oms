import { NgModule } from "@angular/core";
import { OrderComponent } from "../Components/OrderComponent";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ActionComponent } from "../Components/ActionComponent";
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatPaginator, MatTableModule, MatPaginatorModule, MatGridListModule, MatIconModule, MatSnackBarModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { OrderListComponent } from "../Components/OrderListComponent";
import { RouterModule, Routes } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';
import { OrderDashboardComponent } from "../Components/OrderDashboardComponent";
import { RoutingModule } from "./RoutingModule";
import { OrderStateSummaryComponent } from "../Components/OrderStateSummaryComponent";

@NgModule({
  imports: [BrowserModule, FormsModule,
    MatButtonModule, MatCheckboxModule,
    MatCardModule, MatTabsModule,
    MatFormFieldModule, MatInputModule,
    MatDividerModule, MatTableModule,
    MatPaginatorModule, MatMenuModule,
    MatIconModule,MatSnackBarModule,
    RouterModule, MatGridListModule],
  declarations: [OrderComponent, ActionComponent,
    OrderListComponent, OrderDashboardComponent,
    OrderStateSummaryComponent],
  exports: [OrderComponent]
})
export class OrderModule {

}