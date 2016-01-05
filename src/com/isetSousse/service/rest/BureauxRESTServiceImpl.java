package com.isetSousse.service.rest;

import java.util.List;

import javax.ws.rs.Path;

import com.isetSousse.dao.BureauxDao;
import com.isetSousse.entities.Bureaux;

@Path("/Bureaux")
public class BureauxRESTServiceImpl extends RESTService<Bureaux> {

	private final BureauxDao bDao = new BureauxDao();
	@Override
	public void InsertService(Bureaux entity) {
		// TODO Auto-generated method stub
		bDao.Create(entity);
	}

	@Override
	public void UpdateService(Bureaux entity) {
		// TODO Auto-generated method stub
		bDao.Update(entity);
	}

	@Override
	public void deleteService(int id) {
		// TODO Auto-generated method stub
		bDao.delete((Integer)id);
	}

	@Override
	public Bureaux findByIdService(int id) {
		// TODO Auto-generated method stub
		return bDao.findById(id);
	}

	@Override
	public List<Bureaux> findAllService() {
		// TODO Auto-generated method stub
		return bDao.findAll();
	}

}
