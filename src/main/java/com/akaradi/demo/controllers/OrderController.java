package com.akaradi.demo.controllers;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.akaradi.demo.models.Order;
import com.akaradi.demo.services.OrderService;

@Controller("enhancedOrder")
public class OrderController {
	
	Logger LOG = LoggerFactory.getLogger(OrderController.class);
	
	@Autowired
	private OrderService orderService;
	
	@RequestMapping("/")
	public String start(Model model) {
		LOG.info("Started and Showing index.html");
		return "index";
	}
	
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
