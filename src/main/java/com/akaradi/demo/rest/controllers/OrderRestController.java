package com.akaradi.demo.rest.controllers;

import java.util.Collections;
import java.util.List;

import javax.annotation.Resource;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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
import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;

import com.akaradi.demo.repositories.OrderRepository;
import com.akaradi.demo.services.OrderService;

@RestController
@RequestMapping("/order/api/v1.0")
@CrossOrigin
public class OrderRestController {

	@Resource
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

	@PutMapping("/cancelLine")
	public Order updateOrder(@RequestBody OrderLine orderLine) {
		return orderService.cancelLine(orderLine);
	}

	@GetMapping("/getOrder/{id}")
	public Order getOrder(@PathVariable(name = "id") Long orderId) {
		return orderRepository.findById(orderId).get();
	}

	@GetMapping("/getOrders")
	public Iterable<Order> getOrders(@RequestParam(name = "orderNumber", required = false) String orderNumber) {
		if (!StringUtils.isEmpty(orderNumber)) {
			orderNumber = orderNumber.replaceAll("\\*", "\\%");
			return orderRepository.getOrdersByOrderNumber(orderNumber);
		}
		return orderRepository.findAll();
	}
	
	@GetMapping("/stateSummary")
	public List<StateSummary> getStateSummary() {
		return orderRepository.fetchStateSummary();
	}

}
