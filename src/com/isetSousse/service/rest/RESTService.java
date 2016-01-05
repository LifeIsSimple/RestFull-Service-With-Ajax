package com.isetSousse.service.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

public abstract class RESTService <T> {

	@POST
	@Consumes({ MediaType.APPLICATION_JSON})
	@Produces({ MediaType.APPLICATION_JSON })
	public abstract void InsertService(T entity);
		 
	@PUT 
	@Path("{id}")
	@Consumes({ MediaType.APPLICATION_JSON})
	@Produces({ MediaType.APPLICATION_JSON })
	public abstract void UpdateService(T entity);
	
	@DELETE 
	@Path("{id}")
	public abstract void deleteService(@PathParam("id") int id);
	 
	@GET @Path("{id}")
	@Produces({ MediaType.APPLICATION_JSON })
	public abstract T findByIdService(@PathParam("id") int id);
	 
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	public abstract List<T> findAllService();
}
