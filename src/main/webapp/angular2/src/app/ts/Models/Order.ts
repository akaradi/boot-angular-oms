import { OrderLine } from "../Models/OrderLine"

export class Order{
    vendor: string;
	buyer: string;
	deliveryDate: DateTimeFormat;
	shipDate: DateTimeFormat;
	totalCost: number;
	state: string;
    orderNumber: string;
	orderId: number;
	orderLines: OrderLine[] = [];
	constructor(){
		this.orderLines.push(new OrderLine());
	}
}