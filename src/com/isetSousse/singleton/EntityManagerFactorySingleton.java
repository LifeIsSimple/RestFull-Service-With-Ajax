package com.isetSousse.singleton;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

public class EntityManagerFactorySingleton {

	private static EntityManagerFactory emf = null;
	
	private EntityManagerFactorySingleton() {
		emf = Persistence.createEntityManagerFactory("com.isetSousse.config");
	}
	
	public static EntityManagerFactory getEntityManagerFactory() {
		if (emf == null){
			new EntityManagerFactorySingleton();
		}
		return emf;
	}
}
