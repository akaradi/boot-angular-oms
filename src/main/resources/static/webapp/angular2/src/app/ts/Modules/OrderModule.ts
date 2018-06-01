import { NgModule } from "@angular/core";
import { OrderComponent } from "../Components/OrderComponent";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [BrowserModule,FormsModule],
    declarations: [OrderComponent],
    exports: [OrderComponent]
})
export class OrderModule {

}