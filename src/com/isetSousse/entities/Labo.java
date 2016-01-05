package com.isetSousse.entities;

import java.io.Serializable;

import javax.persistence.Entity;

@Entity
public class Labo extends Locaux implements Serializable {

	private static final long serialVersionUID = 1L;

	private String designLabo;

	/**
	 * @return the designLabo
	 */
	public String getDesignLabo() {
		return designLabo;
	}

	/**
	 * @param designLabo the designLabo to set
	 */
	public void setDesignLabo(String designLabo) {
		this.designLabo = designLabo;
	}
}
