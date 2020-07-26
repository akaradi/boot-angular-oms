import { Order } from "../Models/Order";
import { Component, Input, OnInit, HostBinding } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material";


@Component({
    selector: "order-ui",
    templateUrl: "../views/orderUITemplate.html",
    providers: [OrderService]
})
export class OrderComponent implements OnInit {

    @Input() CurrentOrder: Order;

    orders: Order[] = [];
    displayError: string;
    sub;
    id;

    constructor(private orderService: OrderService,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar) {

    }

    ngOnInit() {
        this.CurrentOrder = new Order("test", "test", "test");
        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id']; // (+) converts string 'id' to a number
            if (this.id !== 0) {
                this.getOrderById(this.id);
                console.log(this.CurrentOrder);
            } else {
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
        this.updateSnackBar(this.displayError);
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
                    this.updateSnackBar("Order Created");
                },
                (err) => this.handleError(err)
            );
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

    private updateSnackBar(msg: string) {
            this.snackBar.open(msg, "", {
                duration: 2000,
            });
    }
    
    public updateOrder() {

        this.orderService.updateOrder(this.CurrentOrder)
            .subscribe(
                (res) => {
                    this.CurrentOrder = res;
                    this.updateSnackBar("Order Updated");
                },
                (err) => this.handleError(err)
            );

    }

    public approveOrder() {

        this.orderService.approveOrder(this.CurrentOrder)
            .subscribe(
                (res) => {
                    this.CurrentOrder = res;
                    this.updateSnackBar("Order Approved");
                },
                (err) => this.handleError(err)
            );

    }

    public cancelOrder() {

        this.orderService.cancelOrder(this.CurrentOrder)
            .subscribe(
                (res) => {
                    this.CurrentOrder = res;
                    this.updateSnackBar("Order Cancelled");
                },
                (err) => this.handleError(err)
            );

    }


}



