package com.isetSousse.service.rest;

import java.util.List;

import javax.ws.rs.Path;

import com.isetSousse.dao.SalleDao;
import com.isetSousse.entities.Salle;
@Path("/Salle")
public class SalleRESTServiceImpl extends RESTService<Salle> {

	private final SalleDao salleDao = new SalleDao();
	
	@Override
	public void InsertService(Salle entity) {
		// TODO Auto-generated method stub
		salleDao.Create(entity);
	}

	@Override
	public void UpdateService(Salle entity) {
		// TODO Auto-generated method stub
		salleDao.Update(entity);
	}

	@Override
	public void deleteService(int id) {
		// TODO Auto-generated method stub
		salleDao.delete((Integer)id);
	}

	@Override
	public Salle findByIdService(int id) {
		// TODO Auto-generated method stub
		return salleDao.findById(id);
	}

	@Override
	public List<Salle> findAllService() {
		// TODO Auto-generated method stub
		return salleDao.findAll();
	}

}
