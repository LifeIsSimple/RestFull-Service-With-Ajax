package com.isetSousse.entities;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Etablissement implements Serializable{

	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue
	private int id ;
	
	private String adresse;
	private String adresseAr;
	private String aliasEtab;
	private int cp ;
	private String directeur;
	private String docPhEnseignement;
	private String docPhEtudiant;
	private String email;
	private String fax;
	private String libEtabFr;
	private String libEtabAr;
	private String ministFr;
	private String ministAr;
	private String piedDePage;
	private String rectoralAr;
	private String rectoralFr;
	private String sgAr;
	private String sgFr;
	private String sigle;
	private String tel;
	private String villeAr;
	private String villeFr;
	
	public Etablissement() {
		// TODO Auto-generated constructor stub
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getAdresse() {
		return adresse;
	}
	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}
	public String getAdresseAr() {
		return adresseAr;
	}
	public void setAdresseAr(String adresseAr) {
		this.adresseAr = adresseAr;
	}
	public String getAliasEtab() {
		return aliasEtab;
	}
	public void setAliasEtab(String aliasEtab) {
		this.aliasEtab = aliasEtab;
	}
	public int getCp() {
		return cp;
	}
	public void setCp(int cp) {
		this.cp = cp;
	}
	public String getDirecteur() {
		return directeur;
	}
	public void setDirecteur(String directeur) {
		this.directeur = directeur;
	}
	public String getDocPhEnseignement() {
		return docPhEnseignement;
	}
	public void setDocPhEnseignement(String docPhEnseignement) {
		this.docPhEnseignement = docPhEnseignement;
	}
	public String getDocPhEtudiant() {
		return docPhEtudiant;
	}
	public void setDocPhEtudiant(String docPhEtudiant) {
		this.docPhEtudiant = docPhEtudiant;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getFax() {
		return fax;
	}
	public void setFax(String fax) {
		this.fax = fax;
	}
	public String getLibEtabFr() {
		return libEtabFr;
	}
	public void setLibEtabFr(String libEtabFr) {
		this.libEtabFr = libEtabFr;
	}
	public String getLibEtabAr() {
		return libEtabAr;
	}
	public void setLibEtabAr(String libEtabAr) {
		this.libEtabAr = libEtabAr;
	}
	public String getMinistFr() {
		return ministFr;
	}
	public void setMinistFr(String ministFr) {
		this.ministFr = ministFr;
	}
	public String getMinistAr() {
		return ministAr;
	}
	public void setMinistAr(String ministAr) {
		this.ministAr = ministAr;
	}
	public String getPiedDePage() {
		return piedDePage;
	}
	public void setPiedDePage(String piedDePage) {
		this.piedDePage = piedDePage;
	}
	public String getRectoralAr() {
		return rectoralAr;
	}
	public void setRectoralAr(String rectoralAr) {
		this.rectoralAr = rectoralAr;
	}
	public String getRectoralFr() {
		return rectoralFr;
	}
	public void setRectoralFr(String rectoralFr) {
		this.rectoralFr = rectoralFr;
	}
	public String getSgAr() {
		return sgAr;
	}
	public void setSgAr(String sgAr) {
		this.sgAr = sgAr;
	}
	public String getSgFr() {
		return sgFr;
	}
	public void setSgFr(String sgFr) {
		this.sgFr = sgFr;
	}
	public String getSigle() {
		return sigle;
	}
	public void setSigle(String sigle) {
		this.sigle = sigle;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getVilleAr() {
		return villeAr;
	}
	public void setVilleAr(String villeAr) {
		this.villeAr = villeAr;
	}
	public String getVilleFr() {
		return villeFr;
	}
	public void setVilleFr(String villeFr) {
		this.villeFr = villeFr;
	}
	
	
}
