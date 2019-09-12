package com.akaradi.demo.services;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.akaradi.demo.constants.OrderConstants;
import com.akaradi.demo.enums.State;
import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;
import com.akaradi.demo.repositories.OrderRepository;

@Service
public class OrderServiceImpl implements OrderService {

	static List<State> ignoredStates = Arrays.asList(State.Cancelled);

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
	public void approveOrder(List<Order> orders) {
		orders.stream().forEach(order -> {
			order.setState(State.Approved);
			setLineState(order, State.Approved);
		});
		orderRepository.saveAll(orders);
	}

	@Override
	public void updateOrder(List<Order> orders) {
		orders.stream().forEach(order -> {
			order.setState(State.Draft);
			setLineState(order, State.Draft);
		});
		orderRepository.saveAll(orders);
	}

	@Override
	public Order getOrderByNumber(String orderNumber) {
		return orderRepository.getOrderByOrderNumber(orderNumber);
	}

	@Override
	public Order cancelLine(OrderLine orderLine) {
		Order order = orderRepository.findByOrderLineId(orderLine.getOrderLineId());

		for (OrderLine line : order.getOrderLines()) {
			if (line.equals(orderLine)) {
				line.setState(State.Cancelled);
			}
		}
		return orderRepository.save(order);

	}

	@Override
	public Map<String, List<String>> getActions(List<Order> orders) {
		Map<String, List<String>> actions = new HashMap<>();
		orders.forEach(order -> {
			actions.put(order.getOrderNumber(), getActions(order.getState()));
		});
		return actions;
	}

	public List<String> getActions(State state) {
		List<String> actions = new ArrayList<String>();
		switch (state) {
		case Draft:
			actions.add(OrderConstants.Actions.UPDATE_ORDER);
			actions.add(OrderConstants.Actions.APPROVE_ORDER);
			break;
		case Approved:
			actions.add(OrderConstants.Actions.UPDATE_ORDER);
			break;

		case Cancelled:
			break;
		case Delivered:
		case InTransit:
			actions.add(OrderConstants.Actions.CANCEL_ORDER);
			actions.add(OrderConstants.Actions.UPDATE_ORDER);
			break;
		}
		return actions;
	}

	@Override
	public void cancelOrder(List<Order> orders) {
		orders.stream().forEach(order -> {
			order.setState(State.Cancelled);
			setLineState(order, State.Cancelled);
		});
		orderRepository.saveAll(orders);
	}

	private void setLineState(Order order, State state) {
		order.getOrderLines().stream().filter(line -> !ignoredStates.contains(line.getState()))
				.forEach(line -> line.setState(state));
	}

}
