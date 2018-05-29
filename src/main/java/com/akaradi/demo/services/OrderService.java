package com.akaradi.demo.services;

import java.util.List;

import com.akaradi.demo.models.Order;


public interface OrderService {

	void createOrder(List<Order> orders);
	void updateOrder(List<Order> orders);
	Order getOrderByNumber(String orderNumber);
}
