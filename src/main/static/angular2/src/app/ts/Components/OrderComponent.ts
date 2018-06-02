import { Order } from "../Models/Order";
import { Component, Input, OnInit } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";

@Component({
    selector: "order-ui",
    templateUrl: "../views/orderUITemplate.html",
    styles: [`.scrollable0panel{
        max-height: 300px;
        overflow: auto;
    }`],
    providers: [OrderService]
})
export class OrderComponent implements OnInit {
    @Input() CurrentOrder: Order;
    orders: Order[] = [];
    displayError: string;

    constructor(private orderService: OrderService) {

    }

    ngOnInit() {
        this.CurrentOrder = new Order("test", "test", "test");
    }

    public get value(): string {
        return JSON.stringify(this.CurrentOrder);
    }


    handleError(err){
        console.log(err);
        if(err.error.message){
            this.displayError = err.error.message;
        }else if(err.message){
            this.displayError = err.message;
        }
    }
    public onSubmit() {
        this.displayError = null;
        console.log("Submit clicked" + this.CurrentOrder.buyer);
        this.orderService.saveOrder(this.CurrentOrder)
            .subscribe(
                res => {
                    console.log(res);
                    this.CurrentOrder = res;
                    this.get();
                },
                (err)=> this.handleError(err)
            );
    }
    public addNewLine() {
        let lineNumber = this.CurrentOrder.orderLines.length + 1;
        this.CurrentOrder.orderLines.push(new OrderLine(lineNumber, "", 0, 0));
    }

    public get() {
        this.orderService.getOrders()
            .subscribe(
                data => { this.orders = data },
                err => console.error(err),
                () => console.log('done loading orders')
            );
    }

    public showOrder(orderId: number) {
        let searchedOrder = this.orders.find(order => order.orderId === orderId);
        console.log(searchedOrder);
        if (searchedOrder) {
            this.CurrentOrder = searchedOrder;
        }
    }

    public cancelLine(indexId: number) {
        let deleteLine = this.CurrentOrder.orderLines[indexId];
        if (!deleteLine.orderLineId) {
            this.CurrentOrder.orderLines.splice(indexId,1);
        } else {
            this.orderService.cancelLine(deleteLine)
                .subscribe(
                    (res) => this.handleCancelLineResponse(res),
                    (err)=> this.handleError(err)
                );
        }

    }

    handleCancelLineResponse(res: Order){
        
            console.log(res);
            this.CurrentOrder = res;
            let index = this.orders.findIndex(order => order.orderId === this.CurrentOrder.orderId);
            this.orders.splice(index, 1, this.CurrentOrder);
        
    }

    public updateOrder(){
        this.orderService.updateOrder(this.CurrentOrder)
        .subscribe(
            (res) => this.CurrentOrder = res,
            (err) => this.handleError(err)
        );

    }


}



