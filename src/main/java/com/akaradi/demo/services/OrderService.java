package com.akaradi.demo.services;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.PageRequest;

import com.akaradi.demo.DTO.StateSummary;
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

	Map<String, List<String>> getActions(List<Order> orders);

	List<String> getActions(State state);

	List<Order> searchOrder(String orderNumber, PageRequest pageRequest);

	Long searchOrderCount(String orderNumber);

	Order findById(Long orderId);

	Iterable<Order> getOrdersByOrderNumber(String orderNumber);

	Iterable<Order> findAll();

	List<StateSummary> fetchStateSummary();
}
