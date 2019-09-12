import { Order } from "../Models/Order";
import { Component, Input, OnInit, Output, EventEmitter, HostListener, ViewChild, AfterViewInit } from "@angular/core";
import { OrderLine } from "../Models/OrderLine";
import { OrderService } from "../Service/OrderService";
import { Routes, ActivatedRoute } from "@angular/router";
import { OrderComponent } from "./OrderComponent";
import { MatPaginator, MatTableDataSource, MatPaginatorIntl } from "@angular/material";
import { DataSource } from "@angular/cdk/table";



@Component({
    selector: "order-list",
    templateUrl: "../views/orderListUITemplate.html",
    styles: [`.scrollable1panel{
        max-height: 500px;
        overflow: auto;
    }`],
    providers: [OrderService]
})
export class OrderListComponent implements OnInit, AfterViewInit {
    orders: Order[] = [];
    displayError: string;
    sub; searchOrderNumber;

    dataSource = new MatTableDataSource<Order>(this.orders);
    displayedColumns = ["orderNumber", "buyer", "vendor", "deliveryDate", "shipDate"];

    @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;

    constructor(private orderService: OrderService,
        private route: ActivatedRoute) {
        console.log("OrderListComponent constructor");

    }

    ngAfterViewInit() {
        if (!this.searchOrderNumber) {
            this.getOrders("");
        }
        console.log(this.dataSource);
    }

    handleResponse(orders: Order[]) {
        this.orders = orders;
        this.dataSource.data = orders;

    }

    ngOnInit() {
        console.log("OrderListComponent ngOnInit");
        this.dataSource.paginator = this.paginator;
        this.sub = this.route.queryParams.subscribe(params => {
            this.searchOrderNumber = params['orderNumber']; // (+) converts string 'id' to a number
            if (this.searchOrderNumber) {
                this.getOrders(this.searchOrderNumber);
            }
        });
    }

    public getOrders(orderNumber: string) {
        this.orderService.getOrders(orderNumber).subscribe(
            (resp) => this.handleResponse(resp),
            (err) => console.log(err),
            () => console.log("Complete")
        );
    }

    public showOrder(orderId: number) {
        let searchedOrder = this.orders.find(order => order.orderId === orderId);
        console.log(searchedOrder);
        if (searchedOrder) {
            this.orderService.change.emit(searchedOrder);
        }
    }
}

