package com.isetSousse.entities;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class Salle extends Locaux implements Serializable {

	private static final long serialVersionUID = 1L;

	private String designSalle;
	private int nbrColonnes;
	private int nbrLignes;
	private int nbrPlacesExam;
	private int nbrPlacesMax;
	private int nbrSurveillants;
	
	
	public String getDesignSalle() {
		return designSalle;
	}
	public void setDesignSalle(String designSalle) {
		this.designSalle = designSalle;
	}
	public int getNbrColonnes() {
		return nbrColonnes;
	}
	public void setNbrColonnes(int nbrColonnes) {
		this.nbrColonnes = nbrColonnes;
	}
	public int getNbrLignes() {
		return nbrLignes;
	}
	public void setNbrLignes(int nbrLignes) {
		this.nbrLignes = nbrLignes;
	}
	public int getNbrPlacesExam() {
		return nbrPlacesExam;
	}
	public void setNbrPlacesExam(int nbrPlacesExam) {
		this.nbrPlacesExam = nbrPlacesExam;
	}
	public int getNbrPlacesMax() {
		return nbrPlacesMax;
	}
	public void setNbrPlacesMax(int nbrPlacesMax) {
		this.nbrPlacesMax = nbrPlacesMax;
	}
	public int getNbrSurveillants() {
		return nbrSurveillants;
	}
	public void setNbrSurveillants(int nbrSurveillants) {
		this.nbrSurveillants = nbrSurveillants;
	}
}
