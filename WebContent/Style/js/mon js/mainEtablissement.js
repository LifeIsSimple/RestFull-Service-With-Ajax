// The root URL for the RESTful services
var rootURL = "http://localhost:8080/MiniProject/rest/Etablissement";
var currentEtablissement = null;
var id = 0;

$('#ajouterEtab').click(function() {
	NProgress.start();
	$("#Acceuil").hide();
	$("#form").show();
    $("#list").hide();
	createFormEtab();
	
	$("#nomForm").empty().append("ajouter un Etablissement");
	
	
	new PNotify({
        title: 'Ajouter un Etablissement',
        type: 'dark',
        text: 'L\'initialisation de ces données de bases est la première étape avant de pouvoir manipuler les différents modules de l\'application',
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        }
    });
	NProgress.done();
});


$('#AfficherEtab').click(function() {
	$("#Acceuil").hide();
	$("#list").show();
	$("#form").hide();
	findAllEtab();
		new PNotify({
            title: 'Liste des Etablissements',
            type: 'dark',
            text: 'vous pouver supprimer , modifier est supprimer des etablissment',
            nonblock: {
                nonblock: true,
                nonblock_opacity: .2
            }
        });
});

function findByIdEtab(id) {
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + id,
		dataType: "json",
		success: function(data){
			currentEtablissement = data;
			renderDetail(currentEtablissement);
		}
	});
}

function findAllEtab() {
	NProgress.start();
	$('#listeNom').empty().append("Liste des etablissement" );
	$('#tab_content').empty().append("<table id=\"TabEatb\" class=\"table table-striped responsive-utilities jambo_table\"></table>");
	$('#TabEatb').empty().append("<thead>" +
				"<tr>"+
                "<th>Alias Etablissement</th>"+
                "<th>E-mail</th>"+
                "<th>Fax</th>"+
                "<th>Téléphone</th>"+
                "<th>Adresse</th>"+
                "<th>Ville en Francais</th>"+
                "<th>Action</th>"+
            "</tr>"+
			"</thead><tbody></tbody>");
	
	var oTable = $('#TabEatb').dataTable({
	   	 "language": {
	            "sProcessing":     "Traitement en cours...",
	            "sSearch":         "Rechercher&nbsp;:",
	            "sLengthMenu":     "Afficher _MENU_ &eacute;l&eacute;ments",
	            "sInfo":           "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
	            "sInfoEmpty":      "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
	            "sInfoFiltered":   "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
	            "sInfoPostFix":    "",
	            "sLoadingRecords": "Chargement en cours...",
	            "sZeroRecords":    "Aucun &eacute;l&eacute;ment &agrave; afficher",
	            "sEmptyTable":     "Aucune donn&eacute;e disponible dans le tableau",
	            "oPaginate": {
	                "sFirst":      "Premier",
	                "sPrevious":   "Pr&eacute;c&eacute;dent",
	                "sNext":       "Suivant",
	                "sLast":       "Dernier"
	            },
	            "oAria": {
	                "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
	                "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
	            }
	        },"sPaginationType": "full_numbers",
	        
	        "bDestroy": true,
	    });
	oTable.fnClearTable();
	oTable.fnDraw();
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			$('#TabEatb tbody').empty();
			
			$.each(data, function(index, etab) {
				
				oTable.fnAddData( [
				            etab.aliasEtab,
				            etab.email,
				            etab.fax,
				            etab.tel,
				            etab.adresse,
				            etab.villeFr,
				            "<button id=\"DeleteEtab\" value="+etab.id+" class=\"btn btn-danger pullleft\"> <i class=\"fa fa-trash\"></i></button>"+
				            "<button id=\"UpdataEtab\" value="+etab.id+" class=\"btn btn-sucess pullrigth\"> <i class=\"fa fa-pencil-square-o\"></i> </button>"
				        ] );
				
			});
		}
		
	});

	$('#TabEatb tbody').on( 'click', 'button', function () {
		id =  $(this).val();
		if ($(this).attr('id') == "DeleteEtab"){
			
			$.confirm({
			    title: 'Supprimer etablissement ?',
			    content: 'Tu est sur ?',
			    autoClose: 'cancel|6000',
			    confirm: function(){
			    	deleteEtab(id);
			    },
			    cancel:function(){
			    	new PNotify({
		                title: 'Notification',
		                text: "le supprition de l'etablissment est annuler",
		                type: 'info',
		                hide: false
		            });
			    }
			});
		}else{
			
			$("#list").hide();
			$("#form").show();
			$("#nomForm").empty().append("modifier un Etablissement");
			createFormEtab();
			if (id != 0){
				findByIdEtab(id);
			}
			
			new PNotify({
		        title: 'Modifier un Etablissement',
		        type: 'dark',
		        text: 'L\'initialisation de ces données de bases est la première étape avant de pouvoir manipuler les différents modules de l\'application',
		        nonblock: {
		            nonblock: true,
		            nonblock_opacity: .2
		        }
		    });
			
		}
		
		
		
	} );
	NProgress.done();
}

function deleteEtab(id) {
	$.ajax({
		type: 'DELETE',
		url: rootURL + '/' + id,
		success: function(data, textStatus, jqXHR){
			findAllEtab();
			new PNotify({
                title: 'Notification',
                text: "Le etablisement est Supprimer avec success",
                type: 'success',
                hide: false
            });
		},
		error: function(jqXHR, textStatus, errorThrown){
			new PNotify({
                title: 'Notification',
                text: "cette etablisement a des services ou departments",
                type: 'warning',
                hide: false
            });
		}
	});
}

function updateEtab(id) {
	$.ajax({
		type: 'PUT',
		contentType: 'application/json',
		url: rootURL + '/' + id,
		dataType: "json",
		data: formEatbToJSON(),
		success: function(data, textStatus, jqXHR){
			new PNotify({
                title: 'Notification',
                text: "Le etablisement est Modifier avec success",
                type: 'success',
                hide: true
            });
		},
		error: function(jqXHR, textStatus, errorThrown){
			new PNotify({
                title: 'Notification',
                text: errorThrown,
                type: 'error',
                hide: false
            });
		}
	});
}


function addEtablissement() {
	alert(formEatbToJSON());
	$.ajax({
		type: 'POST',
		contentType: 'application/json',
		url: rootURL,
		dataType: "json",
		data: formEatbToJSON(),
		success: function(data, textStatus, jqXHR){
			
			new PNotify({
                title: 'Notification',
                text: "Le etablisement est creé avec success",
                type: 'success',
                hide: false
            });
		},
		error: function(jqXHR, textStatus, errorThrown){
			new PNotify({
                title: 'Notification',
                text: errorThrown,
                type: 'error',
                hide: false
            });
		}
	});
}

function createFormEtab(data) {
	$("#form_content").empty();
	$("#form_content").append("<form id=\"ajoutForm\" action=\"\" method=\"post\" " +
			"class=\"form-horizontal\" role=\"form\">");
	$("#ajoutForm").empty();
	$('#ajoutForm').append("<input type=\"hidden\" id=\"id\" class=\"form-control\">");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Addresse en Francais</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"adresse\" class=\"form-control validEtab\" placeholder=\"adresse en Francais\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Addresse en arab</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"adresseAr\" class=\"form-control validEtab\" placeholder=\"Addresse en arab \" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">alias Etablissement</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"aliasEtab\" class=\"form-control validEtab\" placeholder=\"alias Etablissement\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Code Postal</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"cp\" class=\"form-control validEtabNUM\" placeholder=\"Code Postal\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Directeur</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"directeur\" class=\"form-control validEtab\" placeholder=\"Directeur\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Document Enseignement</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"docPhEnseignement\" class=\"form-control validEtab\" placeholder=\"Document Enseignement\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Document Etudaint</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"docPhEtudiant\" class=\"form-control validEtab\" placeholder=\"Document Etudaint\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">email</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"email\" class=\"form-control validEtab\" placeholder=\"email\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">fax</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"fax\" class=\"form-control validEtab\" placeholder=\"fax\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Telephone</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"tel\" class=\"form-control validEtabNUM\" placeholder=\"Telephone\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">lib Etablissement en Francais</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"libEtabFr\" class=\"form-control validEtab\" placeholder=\"lib Etablissement en Francais\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">lib Etablissement en arab</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"libEtabAr\" class=\"form-control validEtab\" placeholder=\"lib Etablissement en arab\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">ministere en Francais</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"ministFr\" class=\"form-control validEtab\" placeholder=\"ministere en Francais\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">ministere en arab</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"ministAr\" class=\"form-control validEtab\" placeholder=\"ministere en arab\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">pied De Page</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"piedDePage\" class=\"form-control validEtab\" placeholder=\"pied De Page\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">rectoral en Francais</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"rectoralAr\" class=\"form-control validEtab\" placeholder=\"rectoral en Francais\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">rectoral en arab</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"rectoralFr\" class=\"form-control validEtab\" placeholder=\"rectoral en arab\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">SG en Francais</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"sgFr\" class=\"form-control validEtab\" placeholder=\"SG en Francais\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">SG en arab</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"sgAr\" class=\"form-control validEtab\" placeholder=\"SG en arab\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">sigle</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"sigle\" class=\"form-control validEtab\" placeholder=\"sigle\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Ville en Francais</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"villeAr\" class=\"form-control validEtab\" placeholder=\"Ville en Francais\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">Ville en arab</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"villeFr\" class=\"form-control validEtab\" placeholder=\"Ville en arab\" value=\"\"></div></div>");
	$('#ajoutForm').append("<div class=\"form-group\"><div class=\"col-sm-offset-3 col-sm-4\"><button type=\"sbmit\" class=\"btn btn-default btnSbmit\"> <i class=\"fa fa-check\"></i> Ajouter </button><button type=\"reset\" class=\"btn btn-danger\"><i class=\"fa fa-times-circle\"></i> Annuler</button></div></div>");
	$("#form_content").append("</form>");
	//
	$('#ajoutForm').bootstrapValidator({
        feedbackIcons: {
        	valid: 'fa fa-thumbs-up',
            invalid: 'fa fa-thumbs-o-down',
            validating: 'fa fa-spinner'
        },
        fields: {
        	validEtabCchaine: {
                selector: '.validEtab',
                validators: {
                    notEmpty: {
                    }
                    
                }
            },
            validEtabNumbre: {
                selector: '.validEtabNUM',
                validators: {
                	notEmpty: {
                    },
                    digits : {
                    }
                    
                }
            },
            emailvalidEtab: {
                selector: '#email',
                validators: {
                	notEmpty: {
                    },
                	emailAddress: {
                    	
                    }
                }
            },
        }
    }).on('success.form.bv', function(e) {
    	if ($('#id').val() == '')
    	addEtablissement();
		else
		updateEtab($('#id').val());
    	return true;
    });
	
	
}

// Helper function to serialize all the form fields into a JSON string
function formEatbToJSON() {
	var etabId = $('#id').val();
	return JSON.stringify({
	"id"				: etabId == "" ? null : etabId, 
	"adresse"   		: $('#adresse').val(), 
	"adresseAr"			: $('#adresseAr').val(), 
	"aliasEtab"			: $('#aliasEtab').val(), 
	"cp"				: $('#cp').val(), 
	"directeur"			: $('#directeur').val(), 
	"docPhEnseignement"	: $('#docPhEnseignement').val(), 
	"docPhEtudiant"		: $('#docPhEtudiant').val(), 
	"email"				: $('#email').val(),
	"fax"				: $('#fax').val(), 
	"libEtabFr"			: $('#libEtabFr').val(), 
	"libEtabAr"			: $('#libEtabAr').val(), 
	"ministFr"			: $('#ministFr').val(), 
	"ministAr"			: $('#ministAr').val(), 
	"piedDePage"		: $('#piedDePage').val(), 
	"rectoralAr"		: $('#rectoralAr').val(), 
	"rectoralFr"		: $('#rectoralFr').val(), 
	"sgAr"				: $('#sgAr').val(), 
	"sgFr"				: $('#sgFr').val(), 
	"sigle"				: $('#sigle').val(), 
	"tel"				: $('#tel').val(), 
	"villeAr"			: $('#villeAr').val(), 
	"villeFr"			: $('#villeFr').val()
	});
}

function renderDetail(currentEtablissement) {
	if (currentEtablissement != null){
		$('#id').val(currentEtablissement.id);
		$('#adresse').val(currentEtablissement.adresse);
		$('#adresseAr').val(currentEtablissement.adresseAr);
		$('#aliasEtab').val(currentEtablissement.aliasEtab); 
		$('#cp').val(currentEtablissement.cp); 
		$('#directeur').val(currentEtablissement.directeur);
		$('#docPhEnseignement').val(currentEtablissement.docPhEnseignement);
		$('#docPhEtudiant').val(currentEtablissement.docPhEtudiant);
		$('#email').val(currentEtablissement.email);
		$('#fax').val(currentEtablissement.fax);
		$('#libEtabFr').val(currentEtablissement.libEtabFr);
		$('#libEtabAr').val(currentEtablissement.libEtabAr);
		$('#ministFr').val(currentEtablissement.ministFr);
		$('#ministAr').val(currentEtablissement.ministAr);
		$('#piedDePage').val(currentEtablissement.piedDePage);
		$('#rectoralAr').val(currentEtablissement.rectoralAr);
		$('#rectoralFr').val(currentEtablissement.rectoralFr);
		$('#sgAr').val(currentEtablissement.sgAr);
		$('#sgFr').val(currentEtablissement.sgFr);
		$('#sigle').val(currentEtablissement.sigle);
		$('#tel').val(currentEtablissement.tel);
		$('#villeAr').val(currentEtablissement.villeAr);
		$('#villeFr').val(currentEtablissement.villeFr);
		$('.btnSbmit').empty().append("<i class=\"fa fa-pencil-square-o\"></i> Modifier");
	}
}

function createSelectForm(selecteur) {
	$(selecteur).append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label \">" +
			"Liste de Etablissment</label>" +
			"<div class=\"col-sm-8\">" +
			"<select id=\"listEtab\" class=\"select2 form-control\" ></select>");
	$("#listEtab").append("<option selected value=\" \">-- selection un etablissement --</option>");
	$.ajax({
		type: 'GET',
		url: rootURL,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			
			$.each(data, function(index, etab) {
				$("#listEtab").append("<option value="+etab.id+">"+etab.aliasEtab+"</option>");
			});
			
		}
		
	});
	
}
