package com.isetSousse.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import com.isetSousse.entities.Service;
import com.isetSousse.singleton.EntityManagerFactorySingleton;

public class ServiceDao implements DaoInterface<Service, Integer> {

	private EntityManagerFactory currentEmf;
	
	public ServiceDao() {
		this.currentEmf=EntityManagerFactorySingleton.getEntityManagerFactory();
	}
	
	@Override
	public void Create(Service entity) {
		
		EntityManager currentEm = currentEmf.createEntityManager();
		EntityTransaction currentTransaction = currentEm.getTransaction();
		
		currentTransaction.begin();
		
		currentEm.persist(entity);
		
		currentTransaction.commit();
		
		currentEm.close();
	}

	@Override
	public void Update(Service entity) {
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
		
		currentEm.remove(currentEm.getReference(Service.class, id));
		
		currentTransaction.commit();
		currentEm.close();
	}

	@Override
	public Service findById(Integer id) {
		EntityManager currentEm =currentEmf.createEntityManager();
		return currentEm.find(Service.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Service> findAll() {
		EntityManager currentEm =currentEmf.createEntityManager();
		Query q=currentEm.createQuery("from Service ");
		return  q.getResultList();
	}

}
