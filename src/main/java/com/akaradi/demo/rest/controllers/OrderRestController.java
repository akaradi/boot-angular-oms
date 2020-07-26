package com.akaradi.demo.rest.controllers;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.akaradi.demo.DTO.StateSummary;
import com.akaradi.demo.enums.State;
import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;
import com.akaradi.demo.repositories.OrderRepository;
import com.akaradi.demo.services.OrderService;

@RestController
@RequestMapping("/order/api/v1.0")
@CrossOrigin
public class OrderRestController {

	@Autowired
	private OrderService orderService;

	@Autowired
	private OrderRepository orderRepository;

	@PostMapping("/addOrder")
	public Order addOrder(@RequestBody Order order) {
		order.getOrderLines().stream().forEach(orderLine -> orderLine.setOrder(order));
		orderService.createOrder(Collections.singletonList(order));
		return order;
	}

	@PutMapping("/updateOrder")
	public Order updateOrder(@RequestBody Order order) {
		order.getOrderLines().stream().forEach(orderLine -> orderLine.setOrder(order));
		orderService.updateOrder(Collections.singletonList(order));
		return getOrder(order.getOrderId());
	}

	@PutMapping("/approveOrder")
	public Order approveOrder(@RequestBody Order order) {
		order.getOrderLines().stream().forEach(orderLine -> orderLine.setOrder(order));
		orderService.approveOrder(Collections.singletonList(order));
		return getOrder(order.getOrderId());
	}

	@PutMapping("/cancelOrder")
	public Order cancelOrder(@RequestBody Order order) {
		order.getOrderLines().stream().forEach(orderLine -> orderLine.setOrder(order));
		orderService.cancelOrder(Collections.singletonList(order));
		return getOrder(order.getOrderId());
	}

	@PutMapping("/cancelLine")
	public Order updateOrder(@RequestBody OrderLine orderLine) {
		return orderService.cancelLine(orderLine);
	}

	@GetMapping("/getOrder/{id}")
	public Order getOrder(@PathVariable(name = "id") Long orderId) {
		return orderService.findById(orderId);
	}

	@GetMapping("/getOrders")
	public Iterable<Order> getOrders(@RequestParam(name = "filter", required = false) String orderNumber,
			@RequestParam(name = "pageSize", required = false) Integer pageSize,
			@RequestParam(name = "pageIndex", required = false) Integer pageIndex,
			@RequestParam(name = "sort", required = false) String sort) {
		PageRequest pageRequest = PageRequest.of(pageIndex, pageSize);
		if (!StringUtils.isEmpty(orderNumber)) {
			orderNumber = orderNumber.replaceAll("\\*", "\\%");
		}
		Iterable<Order> orderList = orderService.searchOrder(orderNumber, pageRequest);
		return orderList;
	}

	@GetMapping("/getOrdersCount")
	public Long getOrdersCount(@RequestParam(name = "filter", required = false) String orderNumber) {
		orderNumber = orderNumber.replaceAll("\\*", "\\%");
		Long orderListCount = orderService.searchOrderCount(orderNumber);
		return orderListCount;
	}

	@GetMapping("/stateSummary")
	public List<StateSummary> getStateSummary() {
		return orderService.fetchStateSummary();
	}

	@GetMapping("/getActions")
	public List<String> getActions(@RequestParam(name = "orderState", required = false) String state) {
		return orderService.getActions(State.valueOf(state));
	}

}
