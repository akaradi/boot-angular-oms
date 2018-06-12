import { OrderLine } from "../Models/OrderLine"

export class Order{
    vendor: string;
	buyer: string;
	deliveryDate: Date;
	shipDate: Date;
	totalCost: number;
	state: string;
    orderNumber: string;
	orderId: number;
	buyerAddress: string;
	sellingAddress: string;
	billingAddress: string;
	orderLines: OrderLine[] = [];
	constructor(orderNumber:string, vendor: string,buyer: string){
		this.orderLines.push(new OrderLine(1,"test",0,0));
		this.orderNumber = orderNumber;
		this.vendor = vendor;
		this.buyer = buyer;
		this.deliveryDate = new Date();
		this.shipDate = new Date();
	}
}