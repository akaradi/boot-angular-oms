import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

import { MatIconModule, MatMenuModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpAPIInterceptor } from './ts/Interceptors/HTTPAPIInterceptor';
import { RoutingModule } from './ts/Modules/RoutingModule';

import { AppComponent } from './app.component';
import { OrderModule } from './ts/Modules/OrderModule';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    MatCardModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule,
    FormsModule,
    OrderModule,

    RouterModule.forRoot(
      RoutingModule.appRoutes,
      { enableTracing: false } // <-- debugging purposes only
    )
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpAPIInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
