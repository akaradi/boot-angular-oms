package com.akaradi.demo;

import static org.junit.Assert.assertNotNull;

import java.util.Calendar;
import java.util.Collections;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;
import com.akaradi.demo.services.OrderService;
import com.akaradi.demo.services.OrderServiceImpl;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DemoApplicationTests {

	@Test
	public void contextLoads() {
		OrderService orderService = Mockito.mock(OrderServiceImpl.class);
		
		Order order = new Order();
		order.setBuyer("Anand");
		order.setVendor("Rani");
		Calendar now = Calendar.getInstance();
		Calendar dd = (Calendar) now.clone();
		dd.add(Calendar.DAY_OF_MONTH, 5);
		Calendar sd = (Calendar) now.clone();
		sd.add(Calendar.DAY_OF_MONTH, 5);
		order.setDeliveryDate(sd);
		order.setOrderNumber("test1");
		
		OrderLine line1 = Mockito.mock(OrderLine.class);
		OrderLine line2 = Mockito.mock(OrderLine.class);
		
		order.getOrderLines().add(line1);
		order.getOrderLines().add(line2);
		
		
		orderService.createOrder(Collections.singletonList(order));
		Order savedOrder = orderService.getOrderByNumber(order.getOrderNumber());
		assertNotNull(savedOrder);
	}

}
