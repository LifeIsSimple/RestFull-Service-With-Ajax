package com.isetSousse.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Department implements Serializable{

	private static final long serialVersionUID = 1L;
	@Id @GeneratedValue
	private int id ;
	
	private String codeDep;
	private String description;
	private String nomDepFr;
	private String nomDepAr;
	
	@ManyToOne
	@JoinColumn(nullable=false)
	private Etablissement etablissement;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getCodeDep() {
		return codeDep;
	}
	public void setCodeDep(String codeDep) {
		this.codeDep = codeDep;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getNomDepFr() {
		return nomDepFr;
	}
	public void setNomDepFr(String nomDepFr) {
		this.nomDepFr = nomDepFr;
	}
	public String getNomDepAr() {
		return nomDepAr;
	}
	public void setNomDepAr(String nomDepAr) {
		this.nomDepAr = nomDepAr;
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
