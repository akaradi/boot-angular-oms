import { Injectable, Output, EventEmitter } from "@angular/core";
import { Order } from "../Models/Order";
import { HttpClient } from '@angular/common/http';


import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { OrderLine } from "../Models/OrderLine";


@Injectable({
    providedIn: "root"
})
export class OrderService {

    public static baseUrl = "order/api/v1.0";
    constructor(private _httpClient: HttpClient) { }

    saveOrder(order: Order): Observable<Order> {
        return this._httpClient
            .post(OrderService.baseUrl + "/addOrder", order)
            .pipe(map((resp) => resp as Order));
    }

    updateOrder(order: Order): Observable<Order> {
        return this._httpClient
            .put(OrderService.baseUrl + "/updateOrder", order)
            .pipe(map((resp) => resp as Order));
    }

    approveOrder(order: Order): Observable<Order> {
        return this._httpClient
            .put(OrderService.baseUrl + "/approveOrder", order)
            .pipe(map((resp) => resp as Order));
    }

    cancelOrder(order: Order): Observable<Order> {
        return this._httpClient
            .put(OrderService.baseUrl + "/cancelOrder", order)
            .pipe(map((resp) => resp as Order));
    }

    getOrders(orderNumber: string): Observable<Order[]> {
        return this._httpClient
            .get(OrderService.baseUrl + "/getOrders?orderNumber=" + orderNumber)
            .pipe(map((resp) => resp as Order[]));
    }
    getOrderById(id: number): Observable<Order> {
        return this._httpClient
            .get(OrderService.baseUrl + "/getOrder/" + id)
            .pipe(map((resp) => resp as Order));
    }
    cancelLine(deleteLine: OrderLine): Observable<Order> {
        return this._httpClient
            .put(OrderService.baseUrl + "/cancelLine", deleteLine)
            .pipe(map((resp) => resp as Order));
    }

    getActions(state: string): Observable<string[]> {
        return this._httpClient
            .get(OrderService.baseUrl + "/getActions?orderState=" + state)
            .pipe(map((resp) => resp as string[]));
    }


    @Output() change: EventEmitter<Order> = new EventEmitter();

    showOrder(order: Order) {
        this.change.emit(order);
    }



}