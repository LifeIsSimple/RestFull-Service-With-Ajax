package com.isetSousse.service.rest;

import java.util.List;

import javax.ws.rs.Path;

import com.isetSousse.dao.DepartmentDao;
import com.isetSousse.entities.Department;
@Path("/Department")
public class DepartmentRESTServiceImpl extends RESTService<Department> {

	private final DepartmentDao depDao = new DepartmentDao();
	
	@Override
	public void InsertService(Department entity) {
		// TODO Auto-generated method stub
		depDao.Create(entity);
	}

	@Override
	public void UpdateService(Department entity) {
		// TODO Auto-generated method stub
		depDao.Update(entity);
	}

	@Override
	public void deleteService(int id) {
		// TODO Auto-generated method stub
		depDao.delete((Integer) id);
	}

	@Override
	public Department findByIdService(int id) {
		// TODO Auto-generated method stub
		return depDao.findById(id);
	}

	@Override
	public List<Department> findAllService() {
		// TODO Auto-generated method stub
		return depDao.findAll();
	}

}
