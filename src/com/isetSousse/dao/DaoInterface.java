package com.isetSousse.dao;

import java.io.Serializable;
import java.util.List;

public interface DaoInterface<T,Id extends Serializable> {
	
	 // insert
	 public void Create(T entity);
	 // update
	 public void Update(T entity);
	// delete
	 public void delete(Id id);
	 // select 
	 public T findById(Id id);
	 public List<T> findAll();
	 


}
