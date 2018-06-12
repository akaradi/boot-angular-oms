import { NgModule } from "@angular/core";
import { OrderComponent } from "../Components/OrderComponent";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ActionComponent } from "../Components/ActionComponent";
import { MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule, MatFormFieldModule, MatInputModule, MatPaginator, MatTableModule, MatPaginatorModule } from '@angular/material';
import { MatMenuModule } from '@angular/material/menu';
import { OrderListComponent } from "../Components/OrderListComponent";
import { RouterModule, Routes } from "@angular/router";
import { MatDividerModule } from '@angular/material/divider';

const appRoutes: Routes = [
  { path: 'newOrder/:id', component: OrderComponent }
];

@NgModule({
  imports: [BrowserModule, FormsModule, MatButtonModule, MatCheckboxModule, MatCardModule, MatTabsModule,
    MatFormFieldModule, MatInputModule, MatDividerModule, MatTableModule, MatPaginatorModule, MatMenuModule, 
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )],
  declarations: [OrderComponent, ActionComponent, OrderListComponent],
  exports: [OrderComponent]
})
export class OrderModule {

}