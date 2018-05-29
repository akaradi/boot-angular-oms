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

	
}
