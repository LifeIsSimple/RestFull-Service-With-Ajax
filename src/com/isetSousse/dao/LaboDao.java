package com.isetSousse.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import com.isetSousse.entities.Labo;
import com.isetSousse.singleton.EntityManagerFactorySingleton;

public class LaboDao implements DaoInterface<Labo, Integer> {

	private EntityManagerFactory currentEmf;
	
	public LaboDao() {
		this.currentEmf=EntityManagerFactorySingleton.getEntityManagerFactory();
	}

	@Override
	public void Create(Labo entity) {
		EntityManager currentEm = currentEmf.createEntityManager();
		EntityTransaction currentTransaction = currentEm.getTransaction();
		
		currentTransaction.begin();
		
		currentEm.persist(entity);
		
		currentTransaction.commit();
		
		currentEm.close();
	}

	@Override
	public void Update(Labo entity) {
		EntityManager currentEm;
		EntityTransaction currentTransaction;
		currentEm=currentEmf.createEntityManager();
		currentTransaction=currentEm.getTransaction();
		currentTransaction.begin();
		
		currentEm.merge(entity);
		currentTransaction.commit();
		currentEm.close();
	}

	@Override
	public void delete(Integer id) {
		EntityManager currentEm;
		EntityTransaction currentTransaction;
		currentEm=currentEmf.createEntityManager();
		currentTransaction=currentEm.getTransaction();
		currentTransaction.begin();
		
		currentEm.remove(currentEm.getReference(Labo.class, id));
		
		currentTransaction.commit();
		currentEm.close();
	}

	@Override
	public Labo findById(Integer id) {
		EntityManager currentEm =currentEmf.createEntityManager();
		return currentEm.find(Labo.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Labo> findAll() {
		EntityManager currentEm =currentEmf.createEntityManager();
		Query q=currentEm.createQuery("from Labo");
		return  q.getResultList();
	}
}
