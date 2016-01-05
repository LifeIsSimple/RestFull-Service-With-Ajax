package com.isetSousse.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import com.isetSousse.entities.Salle;
import com.isetSousse.singleton.EntityManagerFactorySingleton;

public class SalleDao implements DaoInterface<Salle, Integer> {

	private EntityManagerFactory currentEmf;
	
	public SalleDao() {
		this.currentEmf=EntityManagerFactorySingleton.getEntityManagerFactory();
	}

	@Override
	public void Create(Salle entity) {
		EntityManager currentEm = currentEmf.createEntityManager();
		EntityTransaction currentTransaction = currentEm.getTransaction();
		
		currentTransaction.begin();
		
		currentEm.persist(entity);
		
		currentTransaction.commit();
		
		currentEm.close();
	}

	@Override
	public void Update(Salle entity) {
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
		
		currentEm.remove(currentEm.getReference(Salle.class, id));
		
		currentTransaction.commit();
		currentEm.close();
	}

	@Override
	public Salle findById(Integer id) {
		EntityManager currentEm =currentEmf.createEntityManager();
		return currentEm.find(Salle.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Salle> findAll() {
		EntityManager currentEm =currentEmf.createEntityManager();
		Query q=currentEm.createQuery("from Salle");
		return  q.getResultList();
	}
}
