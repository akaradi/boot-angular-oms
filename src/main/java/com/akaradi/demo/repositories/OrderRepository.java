package com.akaradi.demo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.akaradi.demo.models.Order;


@Repository
public interface OrderRepository extends CrudRepository<Order, Long>{

	Order getOrderByOrderNumber(String orderNumber);

	@Query(" from Order o join o.orderLines l where l.orderLineId =  :orderLineId")
	Order findByOrderLineId(@Param("orderLineId") long orderLineId);

	/*@Query(" from Order o where o.lastModifiedDate BETWEEN date_sub(now(), interval 2 day) AND NOW() order by o.orderId desc")
	List<Order> fetchRecentFiveOrders();*/
}
