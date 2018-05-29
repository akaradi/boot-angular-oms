package com.akaradi.demo.models;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.akaradi.demo.enums.State;

@Entity
@Table(name="enhanced_order")
public class Order {
	@Id
	@GeneratedValue
	private long orderId;
	private String vendor;
	private String buyer;
	private Calendar deliveryDate;
	private Calendar shipDate;
	private double totalCost;
	private State state;
	private String orderNumber;
	private Calendar lastModifiedDate;
	
	@OneToMany(mappedBy="order", cascade = {CascadeType.PERSIST,CascadeType.MERGE})
	private List<OrderLine> orderLines= new ArrayList<>();
	
	public Order() {
	}

	public long getOrderId() {
		return orderId;
	}

	public void setOrderId(long orderId) {
		this.orderId = orderId;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public String getBuyer() {
		return buyer;
	}

	public void setBuyer(String buyer) {
		this.buyer = buyer;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public List<OrderLine> getOrderLines() {
		return orderLines;
	}
	
	public Calendar getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(Calendar deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public Calendar getShipDate() {
		return shipDate;
	}

	public void setShipDate(Calendar shipDate) {
		this.shipDate = shipDate;
	}

	public State getState() {
		return state;
	}

	public void setState(State state) {
		this.state = state;
	}

	public String getOrderNumber() {
		return orderNumber;
	}

	public void setOrderNumber(String orderNumber) {
		this.orderNumber = orderNumber;
	}
	
	public void addOrderLine(OrderLine line) {
		this.orderLines.add(line);
		line.setOrder(this);
	}
	
	public void removeOrderLine(OrderLine line) {
		this.orderLines.remove(line);
		line.setOrder(null);
	}

	public Calendar getLastModifiedDate() {
		return lastModifiedDate;
	}

	public void setLastModifiedDate(Calendar lastModifiedDate) {
		this.lastModifiedDate = lastModifiedDate;
	}
	

}
