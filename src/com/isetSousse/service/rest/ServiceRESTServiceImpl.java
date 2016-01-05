package com.isetSousse.service.rest;

import java.util.List;


import javax.ws.rs.Path;
import com.isetSousse.dao.ServiceDao;
import com.isetSousse.entities.Service;

@Path("/Service")
public class ServiceRESTServiceImpl extends RESTService<Service> {

	private final ServiceDao sDao = new ServiceDao();
	
	
	@Override
	public void InsertService(Service entity) {
		sDao.Create(entity);
	}
	
	
	@Override
	public void UpdateService(Service entity) {
		sDao.Update(entity);
	}
	
	
	@Override
	public void deleteService(int id) {
		sDao.delete((Integer)id);
	}

	
	@Override
	public Service findByIdService( int id) {
		System.out.println(id);
		return sDao.findById(id);
	}
	
	
	@Override
	public List<Service> findAllService() {
		// TODO Auto-generated method stub
		System.out.print("ok");
		return sDao.findAll();
	}

}
