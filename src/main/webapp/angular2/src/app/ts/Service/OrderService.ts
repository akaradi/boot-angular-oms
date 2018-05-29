import { Injectable } from "@angular/core";
import { Order } from "../Models/Order";
import { HttpClient } from '@angular/common/http';


import { map} from "rxjs/operators";
import { Observable } from "rxjs";


@Injectable({
    providedIn: "root"
})
export class OrderService {

    private baseUrl = "http://localhost:8080/order/api/v1.0";
    constructor(private _httpClient: HttpClient) { }

    saveOrder(order: Order) :Observable<Order> {
        return this._httpClient
        .post(this.baseUrl+"/addOrder", order)
        .pipe(map((resp) => resp as Order));
    }

    getOrders():Observable<Order[]>  {
        return this._httpClient
        .get(this.baseUrl+"/getOrders")
        .pipe(map((resp) => resp as Order[]));
    }
  
}