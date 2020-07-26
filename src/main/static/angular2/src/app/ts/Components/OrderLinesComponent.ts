import { Order } from "../Models/Order";
import { Component, Input, Output, OnInit, HostBinding } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";


@Component({
    selector: "orderLines-ui",
    templateUrl: "../views/orderLinesUITemplate.html",
    providers: [OrderService]
})
export class OrderLinesComponent implements OnInit {

    @Input() orderLines: OrderLine[];
    @Input() order: Order;

    

    constructor(private orderService: OrderService,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.orderLines.length==0? this.orderLines.push(new OrderLine(0, "", 0,0)):this.orderLines;
    }

    public get value(): string {
        return JSON.stringify(this.orderLines);
    }

    public addNewLine() {
        let lineNumber = this.orderLines.length + 1;
        this.orderLines.push(new OrderLine(lineNumber, "", 0, 0));
    }

    public cancelLine(indexId: number) {
        let deleteLine = this.orderLines[indexId];
        if (!deleteLine.orderLineId) {
            this.orderLines.splice(indexId, 1);
            this.updateSnackBar("Line Deleted");
        } else {
            this.orderService.cancelLine(deleteLine)
                .subscribe(
                    (res) => {
                        this.handleCancelLineResponse(res)
                        this.updateSnackBar("Line Cancelled");
                    }
                );
        }

    }
    private updateSnackBar(msg: string) {
        this.snackBar.open(msg, "", {
            duration: 2000,
        });
    }

    handleCancelLineResponse(res: Order) {

        console.log(res);
        //this.order = res;
        this.orderLines = res.orderLines;

    }
}



