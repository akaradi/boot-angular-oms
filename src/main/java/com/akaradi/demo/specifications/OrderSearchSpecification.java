package com.akaradi.demo.specifications;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.akaradi.demo.models.Order;
import com.akaradi.demo.models.OrderLine;

public class OrderSearchSpecification implements Specification<Order> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String searchParam;

	public OrderSearchSpecification(String searchParam) {
		super();
		this.searchParam = searchParam;
	}

	@Override
	public Predicate toPredicate(Root<Order> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
		List<Predicate> predicates = new ArrayList<>();
		if (!StringUtils.isEmpty(searchParam)) {
			Join<OrderLine, Object> orderLineJoin = root.join("orderLines");
			String searchOrder = searchParam;
			predicates.add(criteriaBuilder.like(root.get("orderNumber").as(String.class), "%" + searchOrder + "%"));
			predicates
					.add(criteriaBuilder.like(orderLineJoin.get("itemName").as(String.class), "%" + searchOrder + "%"));
			return criteriaBuilder.or(predicates.toArray(new Predicate[predicates.size()]));
		}
		return null;
	}

}
