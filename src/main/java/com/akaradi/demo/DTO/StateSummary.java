package com.akaradi.demo.DTO;

import com.akaradi.demo.enums.State;

public class StateSummary {
	private State label;
	private Long value;
	
	

	public StateSummary(State label, Long value) {
		this.label = label;
		this.value = value;
	}



	public State getLabel() {
		return label;
	}



	public void setLabel(State label) {
		this.label = label;
	}



	public Long getValue() {
		return value;
	}



	public void setValue(Long value) {
		this.value = value;
	}



	@Override
	public String toString() {
		return "StateSummary [label=" + label + ", value=" + value + "]";
	}

	
}
