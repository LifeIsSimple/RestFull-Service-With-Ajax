package com.isetSousse.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
public abstract class Locaux implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue
	private int id ;
	
	private String nomLocal;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	private Service service;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	private Department department;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getNomLocal() {
		return nomLocal;
	}

	public void setNomLocal(String nomLocal) {
		this.nomLocal = nomLocal;
	}

	public Service getService() {
		return service;
	}

	public void setService(Service service) {
		this.service = service;
	}

	public Department getDepartment() {
		return department;
	}

	public void setDepartment(Department department) {
		this.department = department;
	}
	
}
