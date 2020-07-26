import { Order } from "../Models/Order";
import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from "@angular/core";

import { OrderService } from "../Service/OrderService";
import {  ActivatedRoute } from "@angular/router";

import { MatPaginator} from "@angular/material";

import { OrderListDatasource } from "../Datasource/OrderListDatasource";
import { tap, debounceTime, distinctUntilChanged, merge } from "rxjs/operators";
import { fromEvent } from "rxjs";



@Component({
    selector: "order-list",
    templateUrl: "../views/orderListUITemplate.html",
    styles: [`.scrollablepanel{
        max-height: 500px;
        overflow: auto;
    }`],
    providers: [OrderService]
})
export class OrderListComponent implements OnInit, AfterViewInit {
    orders: Order[] = [];
    displayError: string;
    sub; searchOrderNumber;
    orderCount: number;
    pageSize: number = 5;
    pageSizeOptions:number[] = [5, 10, 25, 100];
    dataSource;
    
    
    displayedColumns = ["orderNumber", "state","buyer", "vendor", "deliveryDate", "shipDate"];

    @ViewChild('orderPaginator',{static: false}) paginator: MatPaginator;
    @ViewChild('searchOrder',{static: false}) searchOrder: ElementRef;

    constructor(private orderService: OrderService,
        private route: ActivatedRoute) {
        this.dataSource = new OrderListDatasource(orderService);
        console.log("OrderListComponent constructor");

    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
         // server-side search
         fromEvent(this.searchOrder.nativeElement,'keyup')
         .pipe(
             debounceTime(300),
             distinctUntilChanged(),
             tap(() => {
                 this.paginator.pageIndex = 0;
                 this.getOrdersCount(this.searchOrder.nativeElement.value);
                 this.loadOrders();
             })
         )
         .subscribe();
        console.log(this.dataSource);
    }

    onPageFired(event){
        console.log(event);
        this.dataSource.loadOrders(
            this.searchOrder.nativeElement.value,
            'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize);
      }

    loadOrders(){
        this.dataSource.loadOrders(
            this.searchOrder.nativeElement.value,
            'asc',
            this.paginator.pageIndex,
            this.paginator.pageSize);
    }

    handleResponse(orders: Order[]) {
        this.orders = orders;
        this.dataSource.data = orders;

    }

    ngOnInit() {
        console.log("OrderListComponent ngOnInit");
        
        this.getOrdersCount("");
        this.dataSource.loadOrders();
        
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

    public getOrdersCount(orderNumber: string) {
        this.orderService.getOrdersCount(orderNumber).subscribe(
            (resp) => this.orderCount = resp,
            (err) => console.log(err),
            () => console.log("Complete")
        );
    }
}

