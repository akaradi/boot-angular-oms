import { NgModule } from "@angular/core";
import { OrderComponent } from "../Components/OrderComponent";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ActionComponent } from "../Components/ActionComponent";
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
    imports: [BrowserModule,FormsModule,MatButtonModule, MatCheckboxModule],
    declarations: [OrderComponent,ActionComponent],
    exports: [OrderComponent]
})
export class OrderModule {

}