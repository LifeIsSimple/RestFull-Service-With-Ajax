package com.isetSousse.entities;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class Bureaux extends Locaux implements Serializable  {

	private static final long serialVersionUID = 1L;
	
	private String designBureaux;

	/**
	 * @return the designBureaux
	 */
	public String getDesignBureaux() {
		return designBureaux;
	}

	/**
	 * @param designBureaux the designBureaux to set
	 */
	public void setDesignBureaux(String designBureaux) {
		this.designBureaux = designBureaux;
	}

}
