import { Order } from "../Models/Order";
import { Component, Input, OnInit } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";
import { Action } from "../Models/Action";

@Component({
    selector: "actionList",
    template: "",
    
   
})
export class ActionComponent implements OnInit {
    actions: [Action];

    ngOnInit(){
        this.actions.push(new Action());
    }

}