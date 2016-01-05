package com.isetSousse.service.rest;

import java.util.List;

import javax.ws.rs.Path;
import com.isetSousse.dao.EtablissementDao;
import com.isetSousse.entities.Etablissement;

@Path("/Etablissement")
public class EtablissementRESTServiceImpl extends RESTService<Etablissement> {

	private final EtablissementDao etabDao = new EtablissementDao();
	
	
	@Override
	public void InsertService(Etablissement entity) {
		// TODO Auto-generated method stub
		System.out.println("add etab");
		etabDao.Create(entity);
	}
	
	
	
	@Override
	public void UpdateService(Etablissement entity) {
		// TODO Auto-generated method stub
		etabDao.Update(entity);
	}

	
	@Override
	public void deleteService(int id) {
		// TODO Auto-generated method stub
		etabDao.delete((Integer)id);
	}

	@Override
	public Etablissement findByIdService(int id) {
		// TODO Auto-generated method stub
		return etabDao.findById((Integer) id);
	}

	@Override
	public List<Etablissement> findAllService() {
		// TODO Auto-generated method stub
		System.out.println("add etab");
		return etabDao.findAll();
	}

}
