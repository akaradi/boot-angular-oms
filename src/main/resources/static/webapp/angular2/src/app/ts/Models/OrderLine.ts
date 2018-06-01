export class OrderLine {

    orderLineId: number;
    lineNumber: number;
	itemName: string;
	price: number;
    state: string;
    quantity: number;

    constructor(lnumber: number,itemName: string, price: number,quantity: number){
        this.lineNumber = lnumber;
        this.state = "Draft";
        this.itemName = itemName;
        this.price = price;
        this.quantity = quantity;
    }
} 
