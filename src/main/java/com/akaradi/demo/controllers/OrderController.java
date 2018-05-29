package com.akaradi.demo.controllers;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.akaradi.demo.models.Order;
import com.akaradi.demo.services.OrderService;

@Controller("enhancedOrder")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping("/addOrder")
	public String addOrder(Order order,Model model) {
		orderService.createOrder(Collections.singletonList(order));
		model.addAttribute(order);
		return "order";
	}
	
	@RequestMapping("/updateOrder")
	public String updateOrder(Order order,Model model) {
		orderService.updateOrder(Collections.singletonList(order));
		model.addAttribute(order);
		return "order";
	}

}
