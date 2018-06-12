import { Order } from "../Models/Order";
import { Component, Input, OnInit, HostBinding } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "order-ui",
    templateUrl: "../views/orderUITemplate.html",
    styles: [`.scrollable0panel{
        max-height: 200px;
        overflow: auto;
    }`],
    providers: [OrderService]
})
export class OrderComponent implements OnInit {

    @Input() CurrentOrder: Order;

    orders: Order[] = [];
    displayError: string;
    sub;
    id;

    constructor(private orderService: OrderService,
        private route: ActivatedRoute) {

    }

    ngOnInit() {
        this.CurrentOrder = new Order("test", "test", "test");
        //this.orderService.change.subscribe(order => this.CurrentOrder = order);
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            if (this.id !== 0) {
                this.getOrderById(this.id);
                console.log(this.CurrentOrder);
            }else{
                this.CurrentOrder = new Order("test", "test", "test"); 
            }
        });
    }

    public get value(): string {
        return JSON.stringify(this.CurrentOrder);
    }


    handleError(err) {
        console.log(err);
        if (err.error.message) {
            this.displayError = err.error.message;
        } else if (err.message) {
            this.displayError = err.message;
        }
    }

    public getOrderById(id: number): Order {
        this.orderService.getOrderById(id)
            .subscribe((resp) => this.CurrentOrder = resp,
                (err) => this.handleError(err));
        return null;
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
                (err) => this.handleError(err)
            );
    }
    public addNewLine() {
        let lineNumber = this.CurrentOrder.orderLines.length + 1;
        this.CurrentOrder.orderLines.push(new OrderLine(lineNumber, "", 0, 0));
    }

    public get() {
        this.orderService.getOrders(null)
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
            this.CurrentOrder.orderLines.splice(indexId, 1);
        } else {
            this.orderService.cancelLine(deleteLine)
                .subscribe(
                    (res) => this.handleCancelLineResponse(res),
                    (err) => this.handleError(err)
                );
        }

    }

    handleCancelLineResponse(res: Order) {

        console.log(res);
        this.CurrentOrder = res;
        let index = this.orders.findIndex(order => order.orderId === this.CurrentOrder.orderId);
        this.orders.splice(index, 1, this.CurrentOrder);

    }

    public updateOrder() {
        this.orderService.updateOrder(this.CurrentOrder)
            .subscribe(
                (res) => this.CurrentOrder = res,
                (err) => this.handleError(err)
            );

    }


}



