import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { OrderModule } from './ts/Modules/OrderModule';
import { OrderComponent } from './ts/Components/OrderComponent';
import { OrderListComponent } from './ts/Components/OrderListComponent';
import { MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'newOrder/:id',component: OrderComponent },
  { path: 'orders',component: OrderListComponent },
  { path: 'orders?orderNumber=',component: OrderListComponent }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,MatFormFieldModule,MatInputModule,
    FormsModule,
    OrderModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
