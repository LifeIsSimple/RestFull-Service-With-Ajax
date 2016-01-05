package com.isetSousse.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Query;

import com.isetSousse.entities.Department;
import com.isetSousse.singleton.EntityManagerFactorySingleton;

public class DepartmentDao implements DaoInterface<Department, Integer> {

	private EntityManagerFactory currentEmf;
	
	public DepartmentDao() {
		this.currentEmf=EntityManagerFactorySingleton.getEntityManagerFactory();
	}

	@Override
	public void Create(Department entity) {
		EntityManager currentEm = currentEmf.createEntityManager();
		EntityTransaction currentTransaction = currentEm.getTransaction();
		
		currentTransaction.begin();
		
		currentEm.persist(entity);
		
		currentTransaction.commit();
		
		currentEm.close();
	}

	@Override
	public void Update(Department entity) {
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
		
		currentEm.remove(currentEm.getReference(Department.class, id));
		
		currentTransaction.commit();
		currentEm.close();
	}

	@Override
	public Department findById(Integer id) {
		EntityManager currentEm =currentEmf.createEntityManager();
		return currentEm.find(Department.class, id);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<Department> findAll() {
		EntityManager currentEm =currentEmf.createEntityManager();
		Query q=currentEm.createQuery("from Department");
		return  q.getResultList();
	}
}
