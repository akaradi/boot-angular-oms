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
	private String billingAddress;
	private String sellingAddress;
	private String buyerAddress;
	
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

	public String getBillingAddress() {
		return billingAddress;
	}

	public void setBillingAddress(String billingAddress) {
		this.billingAddress = billingAddress;
	}

	public String getSellingAddress() {
		return sellingAddress;
	}

	public void setSellingAddress(String sellingAddress) {
		this.sellingAddress = sellingAddress;
	}

	public String getBuyerAddress() {
		return buyerAddress;
	}

	public void setBuyerAddress(String buyerAddress) {
		this.buyerAddress = buyerAddress;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (orderId ^ (orderId >>> 32));
		result = prime * result + ((orderNumber == null) ? 0 : orderNumber.hashCode());
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
		Order other = (Order) obj;
		if (orderId != other.orderId)
			return false;
		if (orderNumber == null) {
			if (other.orderNumber != null)
				return false;
		} else if (!orderNumber.equals(other.orderNumber))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "Order [orderId=" + orderId + ", vendor=" + vendor + ", buyer=" + buyer + ", deliveryDate="
				+ deliveryDate + ", shipDate=" + shipDate + ", state=" + state + ", orderNumber=" + orderNumber + "]";
	}
	
}
