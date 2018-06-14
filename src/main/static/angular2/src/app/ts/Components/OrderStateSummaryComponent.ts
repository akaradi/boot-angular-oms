import { Component, OnInit, Injectable } from "@angular/core";
import { OrderService } from "../Service/OrderService";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

@Component({
    selector: "order-state-summary",
    templateUrl: "../views/orderStateSummaryUITemplate.html",
    providers: [OrderService]
})
export class OrderStateSummaryComponent implements OnInit {

    stateSummary: StateSummary[] = [];
    displayError: string;
    dataSource: JSON;
    chart = `{"chart": {
        "caption": "Harrys SuperMart",
        "subCaption": "Top 5 stores in last month by revenue"
    },`;

    displayedColumns = ["label", "value"];

    constructor(private _httpClient: HttpClient) {
        console.log("OrderStateSummaryComponent constructor");
        
    }

    ngOnInit() {
        this.getStateSummary();
    }

    handleResponse(stateSummary: StateSummary[]) {
        this.stateSummary = stateSummary;

        let stringified = JSON.stringify(this.stateSummary);
        stringified = `"data":`.concat(stringified);
        stringified = this.chart.concat(stringified).concat("}");
        
        this.dataSource = JSON.parse(stringified);
        console.log(this.dataSource);
    }

    public getStateSummary() {
        this._httpClient
            .get(OrderService.baseUrl + "/stateSummary")
            .pipe(map((resp) => resp as StateSummary[])).subscribe(
                (resp) => this.handleResponse(resp),
                (err) => console.log(err),
                () => console.log("Complete")
            );
    }

}

interface StateSummary {
    label: String;
    value: String;
}

