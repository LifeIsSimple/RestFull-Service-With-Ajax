package com.isetSousse.service.rest;

import java.util.List;

import javax.ws.rs.Path;

import com.isetSousse.dao.LaboDao;
import com.isetSousse.entities.Labo;
@Path("/Labo")
public class LaboRESTServiceImpl extends RESTService<Labo>{

	private final LaboDao laboDao = new LaboDao();
	
	@Override
	public void InsertService(Labo entity) {
		// TODO Auto-generated method stub
		laboDao.Create(entity);
	}

	@Override
	public void UpdateService(Labo entity) {
		// TODO Auto-generated method stub
		laboDao.Update(entity);
	}

	@Override
	public void deleteService(int id) {
		// TODO Auto-generated method stub
		laboDao.delete((Integer)id);
	}

	@Override
	public Labo findByIdService(int id) {
		// TODO Auto-generated method stub
		return laboDao.findById(id);
	}

	@Override
	public List<Labo> findAllService() {
		// TODO Auto-generated method stub
		return laboDao.findAll();
	}

}
