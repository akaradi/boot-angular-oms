package com.akaradi.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.akaradi.demo.DTO.StateSummary;
import com.akaradi.demo.models.Order;

@Repository
public interface OrderRepository extends CrudRepository<Order, Long> {
	
	Order getOrderByOrderNumber(String orderNumber);

	@Query(" from Order o join o.orderLines l where l.orderLineId =  :orderLineId")
	Order findByOrderLineId(@Param("orderLineId") long orderLineId);

	@Query(" from Order o where o.orderNumber like :orderNumber")
	Iterable<Order> getOrdersByOrderNumber(@Param("orderNumber") String orderNumber);

	@Query("SELECT new com.akaradi.demo.DTO.StateSummary(o.state as label,count(o) as value) FROM Order o group by o.state")
	List<StateSummary> fetchStateSummary();

}
