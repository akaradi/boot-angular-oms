package com.akaradi.demo.services;

import java.util.List;

import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;


public interface OrderService {

	void createOrder(List<Order> orders);
	void updateOrder(List<Order> orders);
	Order getOrderByNumber(String orderNumber);
	Order cancelLine(OrderLine orderLine);
}
