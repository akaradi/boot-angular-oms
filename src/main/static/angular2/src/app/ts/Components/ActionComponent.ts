import { Component, OnInit } from "@angular/core";
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