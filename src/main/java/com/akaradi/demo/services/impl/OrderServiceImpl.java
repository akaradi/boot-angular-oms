package com.akaradi.demo.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akaradi.demo.enums.State;
import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;
import com.akaradi.demo.repositories.OrderRepository;
import com.akaradi.demo.services.OrderService;

@Service
public class OrderServiceImpl implements OrderService {
	
	OrderRepository orderRepository;

	public OrderServiceImpl() {
		
	}
	@Autowired
	public OrderServiceImpl(OrderRepository orderRepository) {
		this.orderRepository = orderRepository;
	}

	@Override
	public void createOrder(List<Order> orders) {
		orders.stream().forEach(order -> order.setState(State.Draft));
		orderRepository.saveAll(orders);
	}

	@Override
	public void updateOrder(List<Order> orders) {
		orders.stream().forEach(order -> order.setState(State.Draft));
		orderRepository.saveAll(orders);
	}

	@Override
	public Order getOrderByNumber(String orderNumber) {
		return orderRepository.getOrderByOrderNumber(orderNumber);
	}
	
	@Override
	public Order cancelLine(OrderLine orderLine) {
		Order order = orderRepository.findByOrderLineId(orderLine.getOrderLineId());
		
		for(OrderLine line : order.getOrderLines()) {
			if(line.equals(orderLine)) {
				line.setState(State.Cancelled);
			}
		}
		return orderRepository.save(order);
		
	}

}
