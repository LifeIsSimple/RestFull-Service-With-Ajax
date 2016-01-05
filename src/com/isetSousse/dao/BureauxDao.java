package com.isetSousse.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import com.isetSousse.entities.Bureaux;
import com.isetSousse.singleton.EntityManagerFactorySingleton;

public class BureauxDao implements DaoInterface<Bureaux, Integer> {

	private EntityManagerFactory currentEmf;
	
	public BureauxDao() {
		this.currentEmf=EntityManagerFactorySingleton.getEntityManagerFactory();
	}

	@Override
	public void Create(Bureaux entity) {
		EntityManager currentEm = currentEmf.createEntityManager();
		EntityTransaction currentTransaction = currentEm.getTransaction();
		
		currentTransaction.begin();
		
		currentEm.persist(entity);
		
		currentTransaction.commit();
		
		currentEm.close();
	}

	@Override
	public void Update(Bureaux entity) {
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
		
		currentEm.remove(currentEm.getReference(Bureaux.class, id));
		
		currentTransaction.commit();
		currentEm.close();
	}

	@Override
	public Bureaux findById(Integer id) {
		EntityManager currentEm =currentEmf.createEntityManager();
		return currentEm.find(Bureaux.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Bureaux> findAll() {
		EntityManager currentEm =currentEmf.createEntityManager();
		Query q=currentEm.createQuery("from Bureaux");
		return  q.getResultList();
	}
}
