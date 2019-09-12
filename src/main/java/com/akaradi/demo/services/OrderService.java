package com.akaradi.demo.services;

import java.util.List;
import java.util.Map;

import com.akaradi.demo.enums.State;
import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;


public interface OrderService {

	void createOrder(List<Order> orders);
	void approveOrder(List<Order> orders);
	void updateOrder(List<Order> orders);
	Order getOrderByNumber(String orderNumber);
	Order cancelLine(OrderLine orderLine);
	void cancelOrder(List<Order> orders);
	Map<String,List<String>> getActions(List<Order> orders);
	List<String> getActions(State state);
}
