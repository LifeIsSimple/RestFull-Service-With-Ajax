package com.isetSousse.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Service implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue
	private int id ;
	
	private String designService;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	private Etablissement etablissement;
	
	public String getDesignService() {
		return designService;
	}
	
	
	public void setDesignService(String designService) {
		this.designService = designService;
	}
	
	
	public int getId() {
		return id;
	}
	
	
	public void setId(int id) {
		this.id = id;
	}


	/**
	 * @return the etablissement
	 */
	public Etablissement getEtablissement() {
		return etablissement;
	}


	/**
	 * @param etablissement the etablissement to set
	 */
	public void setEtablissement(Etablissement etablissement) {
		this.etablissement = etablissement;
	}
}
