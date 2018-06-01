import { Order } from "../Models/Order";
import { Component, Input, OnInit } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";
import { runInThisContext } from "vm";
import { Action } from "../Models/Action";

@Component({
    selector: "actionList",
    templateUrl: "../views/actionUITemplate.html",
    
   
})
export class ActionComponent implements OnInit {
    actions: [Action];

    ngOnInit(){
        this.actions.push(new Action());
    }

}