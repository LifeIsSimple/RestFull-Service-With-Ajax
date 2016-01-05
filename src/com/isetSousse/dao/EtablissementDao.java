package com.isetSousse.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import com.isetSousse.entities.Etablissement;
import com.isetSousse.singleton.EntityManagerFactorySingleton;

public class EtablissementDao implements DaoInterface<Etablissement, Integer> {

	private EntityManagerFactory currentEmf;
	
	public EtablissementDao() {
		this.currentEmf=EntityManagerFactorySingleton.getEntityManagerFactory();
	}

	@Override
	public void Create(Etablissement entity) {
		EntityManager currentEm = currentEmf.createEntityManager();
		EntityTransaction currentTransaction = currentEm.getTransaction();
		
		currentTransaction.begin();
		
		currentEm.persist(entity);
		
		currentTransaction.commit();
		
		currentEm.close();
	}

	@Override
	public void Update(Etablissement entity) {
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
		
		currentEm.remove(currentEm.getReference(Etablissement.class, id));
		
		currentTransaction.commit();
		currentEm.close();
	}

	@Override
	public Etablissement findById(Integer id) {
		EntityManager currentEm =currentEmf.createEntityManager();
		return currentEm.find(Etablissement.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Etablissement> findAll() {
		EntityManager currentEm =currentEmf.createEntityManager();
		Query q=currentEm.createQuery("from Etablissement");
		return  q.getResultList();
	}
}
