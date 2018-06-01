package com.akaradi.demo.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.akaradi.demo.enums.State;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class OrderLine {
	@Id
	@GeneratedValue
	private long orderLineId;

	private String itemName;
	private long quantity;
	private long lineNumber;
	private double price;
	private State state;

	@ManyToOne
	@JsonIgnore
	private Order order;

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

	public long getOrderLineId() {
		return orderLineId;
	}

	public void setOrderLineId(long orderLineId) {
		this.orderLineId = orderLineId;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public long getQuantity() {
		return quantity;
	}

	public void setQuantity(long quantity) {
		this.quantity = quantity;
	}

	public long getLineNumber() {
		return lineNumber;
	}

	public void setLineNumber(long lineNumber) {
		this.lineNumber = lineNumber;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (lineNumber ^ (lineNumber >>> 32));
		result = prime * result + ((order == null) ? 0 : order.hashCode());
		result = prime * result + (int) (orderLineId ^ (orderLineId >>> 32));
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		OrderLine other = (OrderLine) obj;
		if (lineNumber != other.lineNumber)
			return false;
		
		if (orderLineId != other.orderLineId)
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "OrderLine [orderLineId=" + orderLineId + ", itemName=" + itemName + ", quantity=" + quantity
				+ ", lineNumber=" + lineNumber + ", price=" + price + ", state=" + state + "]";
	}

}
