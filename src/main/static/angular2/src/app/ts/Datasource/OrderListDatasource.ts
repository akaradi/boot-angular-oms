import { BehaviorSubject, Observable, of } from "rxjs";
import { Order } from "../Models/Order";
import { DataSource } from "@angular/cdk/table";
import { OrderService } from "../Service/OrderService";
import { CollectionViewer } from "@angular/cdk/collections";
import { catchError, finalize } from "rxjs/operators";

export class OrderListDatasource implements DataSource<Order> {

    private ordersSubject = new BehaviorSubject<Order[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private orderService: OrderService) {}

    connect(collectionViewer: CollectionViewer): Observable<Order[]> {
        return this.ordersSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.ordersSubject.complete();
        this.loadingSubject.complete();
    }

    loadOrders( filter = '',
                sortDirection = 'asc', pageIndex = 0, pageSize = 5) {

        this.loadingSubject.next(true);

        this.orderService.getOrdersPage(filter, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe(orders => this.ordersSubject.next(orders));
    }    
}