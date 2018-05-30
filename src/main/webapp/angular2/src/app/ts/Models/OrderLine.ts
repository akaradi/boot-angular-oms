export class OrderLine {

    orderLineId: number;
    lineNumber: number;
	itemName: string;
	price: number;
    state: string;
    quantity: number;

    constructor(lnumber: number){
        this.lineNumber = lnumber;
        this.state = "Draft";
    }
} 
