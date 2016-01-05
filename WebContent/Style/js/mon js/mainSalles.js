// The root URL for the RESTful services
var rootURLSalle = "http://localhost:8080/MiniProject/rest/Salle";

var currentSalle;

$('#ajouterSalles').click(function() {
	NProgress.start();
	$("#form").show();
	$("#Acceuil").hide();
    $("#list").hide();
	createSalleForm();
	$("#nomForm").empty().append("ajouter un Salle");
	
	new PNotify({
        title: 'Ajouter un Salle',
        type: 'dark',
        text: 'L\'initialisation de ces données de bases est la première étape avant de pouvoir manipuler les différents modules de l\'application',
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        }
    });
	NProgress.done();
});
$('#AfficherSalles').click(function() {
	NProgress.start();
	$("#list").show();
	$("#Acceuil").hide();
	$("#form").hide();
	findAllSalle();
		new PNotify({
            title: 'Liste des Salle',
            type: 'dark',
            text: 'vous pouver supprimer , modifier est supprimer des Salle',
            nonblock: {
                nonblock: true,
                nonblock_opacity: .2
            }
        });
	
	NProgress.done();
});

function findAllSalle() {
	NProgress.start();
	$('#listeNom').empty().append("Liste des Salle" );
	$('#tab_content').empty().append("<table id=\"TabSalle\" class=\"table table-striped responsive-utilities jambo_table\"></table>");
	$('#TabSalle').empty().append("<thead>" +
				"<tr>"+
                "<th>nom Deprtment en Francais</th>"+
                "<th>nom Local</th>"+
                "<th>designSalle</th>"+
                "<th>design Service</th>"+
                "<th>Action</th>"+
            "</tr>"+
			"</thead><tbody></tbody>");
	
	
	
	var oTable = $('#TabSalle').dataTable({
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
		url: rootURLSalle,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			$('#TabSalle tbody').empty();
			
			$.each(data, function(index, salle) {
				oTable.fnAddData( [
				            salle.department.nomDepFr,
				            salle.nomLocal,
				            salle.designSalle,
				            salle.service.designService,
				            "<button id=\"DeleteSalle\" value="+salle.id+" class=\"btn btn-danger pullleft\"> <i class=\"fa fa-trash\"></i></button>"+
				            "<button id=\"UpdataSalle\" value="+salle.id+" class=\"btn btn-sucess pullrigth\"> <i class=\"fa fa-pencil-square-o\"></i> </button>"
				        ] );
				
			});
		}
		
	});

	$('#TabSalle tbody').on( 'click', 'button', function () {
		var id =  $(this).val();
		if ($(this).attr('id') == "DeleteSalle"){
			
			$.confirm({
			    title: 'Supprimer Salle ?',
			    content: 'Tu est sur ?',
			    autoClose: 'cancel|6000',
			    confirm: function(){
			    	
			    	deleteSalle(id);
			    },
			    cancel:function(){
			    	new PNotify({
		                title: 'Notification',
		                text: "le supprition de Salle est annuler",
		                type: 'info',
		                hide: false
		            });
			    }
			});
		}else{
			
			$("#list").hide();
			$("#form").show();
			$("#nomForm").empty().append("modifier un Salle");
			createSalleForm();
			findByIdSalle(id);
			new PNotify({
		        title: 'Modifier un Salle',
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

function deleteSalle(id){
	$.ajax({
		type: 'DELETE',
		url: rootURLSalle + '/' + id,
		success: function(data, textStatus, jqXHR){
			findAllSalle();
			new PNotify({
                title: 'Notification',
                text: "Le Salle est supprimer avec success",
                type: 'success',
                hide: false
            });
		},
		error: function(jqXHR, textStatus, errorThrown){
			new PNotify({
                title: 'Notification',
                text:errorThrown,
                type: 'warning',
                hide: false
            });
		}
	});
}

function findByIdSalle(id) {
	$.ajax({
		type: 'GET',
		url: rootURLSalle + '/' + id,
		dataType: "json",
		success: function(data){
			currentSalle = data;
			renderDetailSalle(currentSalle);
		}
	});
}

function addSalles() {
	$.ajax({
		type: 'GET',
		url: rootURLDep + '/' + $('#listDep').val(),
		dataType: "json",
		success: function(dep){
			$.ajax({
				type: 'GET',
				url: rootURLServ + '/' + $('#listServ').val(),
				dataType: "json",
				success: function(serv){
					$.ajax({
						type: 'POST',
						contentType: 'application/json',
						url: rootURLSalle,
						dataType: "json",
						data: formToJSONSalles(serv, dep),
						success: function(data, textStatus, jqXHR){
							new PNotify({
				                title: 'Notification',
				                text: "Le Service est Creé avec success",
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
			});
		}
	});
}

function updateSalles() {
	$.ajax({
		type: 'GET',
		url: rootURLDep + '/' + $('#listDep').val(),
		dataType: "json",
		success: function(dep){
			$.ajax({
				type: 'GET',
				url: rootURLServ + '/' + $('#listServ').val(),
				dataType: "json",
				success: function(serv){
					$.ajax({
						type: 'PUT',
						contentType: 'application/json',
						url: rootURLSalle + '/' + id,
						dataType: "json",
						data: formToJSONSalles(serv, dep),
						success: function(data, textStatus, jqXHR){
							new PNotify({
				                title: 'Notification',
				                text: "Le Service est Creé avec success",
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
			});
		}
	});
}

function createSalleForm() {
	$("#form_content").empty();
	$("#form_content").append("<form id=\"ajoutFormSalle\" action=\"\" method=\"post\" " +
			"class=\"form-horizontal\" role=\"form\">");
	$('#ajoutFormSalle').append("<input type=\"hidden\" id=\"id\" class=\"form-control\">");
	$('#ajoutFormSalle').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">design Salle</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"designSalle\" class=\"form-control validServ\" placeholder=\"design Salle\" value=\"\"></div></div>");
	$('#ajoutFormSalle').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nom Local</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nomLocal\" class=\"form-control validServ\" placeholder=\"nom Local\" value=\"\"></div></div>");
	$('#ajoutFormSalle').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nombre de Colonnes</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nbrColonnes\" class=\"form-control validNUM\" placeholder=\"nombre de Colonnes\" value=\"\"></div></div>");
	$('#ajoutFormSalle').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nombre de Lignes</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nbrLignes\" class=\"form-control validNUM\" placeholder=\">nombre de Lignes\" value=\"\"></div></div>");
	$('#ajoutFormSalle').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nombre de Places Examen</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nbrPlacesExam\" class=\"form-control validNUM\" placeholder=\"nombre de Places Examen\" value=\"\"></div></div>");
	$('#ajoutFormSalle').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nombre de Places Maximal</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nbrPlacesMax\" class=\"form-control validNUM\" placeholder=\"nombre de Places Maximal\" value=\"\"></div></div>");
	$('#ajoutFormSalle').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nombre de Surveillants</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nbrSurveillants\" class=\"form-control validNUM\" placeholder=\"nombre de Surveillants\" value=\"\"></div></div>");
	createSelectFormDep('#ajoutFormSalle');
	createSelectFormServ('#ajoutFormSalle') ;
	$('#ajoutFormSalle').append("<div class=\"form-group\"><div class=\"col-sm-offset-3 col-sm-4\"><button type=\"type\" class=\"btn btn-default\"> <i class=\"fa fa-check\"></i> Ajouter </button><button type=\"reset\" class=\"btn btn-danger\"><i class=\"fa fa-times-circle\"></i> Annuler</button></div></div>");
	
	$('#ajoutFormSalle').bootstrapValidator({
        feedbackIcons: {
        	valid: 'fa fa-thumbs-up',
            invalid: 'fa fa-thumbs-o-down',
            validating: 'fa fa-spinner'
        },
        fields: {
            percentage: {
                selector: '.validServ',
                validators: {
                    notEmpty: {
                    }
                    
                }
            },validlist: {
                selector: '.select2',
                validators: {
                    notEmpty: {
                    }
                    
                }
            },validNumbre: {
                selector: '.validNUM',
                validators: {
                	notEmpty: {
                    },
                    digits : {
                    }
                    
                }
            }
        }
    }).on('success.form.bv', function(e) {
    	if ($('#id').val() == '')
    		
			addSalles();
		else
			updateSalles($('#id').val());
		return true;
    });
	
}

function formToJSONSalles(serv,dep) {
	var BureauxId = $('#id').val();
	return JSON.stringify({
	"id"				: BureauxId == "" ? null : BureauxId, 
	"designSalle"   	: $('#designSalle').val(),
	"nomLocal"			: $('#nomLocal').val(),
	"nbrColonnes"   	: $('#nbrColonnes').val(),
	"nbrLignes"   		: $('#nbrLignes').val(),
	"nbrPlacesExam"   	: $('#nbrPlacesExam').val(),
	"nbrPlacesMax"   	: $('#nbrPlacesMax').val(),
	"nbrSurveillants"   : $('#nbrSurveillants').val(),
	"service"     		: serv,
	"department"     	: dep
	});
}

function renderDetailSalle(data) {
	$('#id').val(data.id);
	$('#designSalle').val(data.designSalle);
	$('#nomLocal').val(data.nomLocal);
	$('#nbrColonnes').val(data.nbrColonnes);
	$('#nbrLignes').val(data.nbrLignes);
	$('#nbrPlacesExam').val(data.nbrPlacesExam);
	$('#nbrPlacesMax').val(data.nbrPlacesMax);
	$('#nbrSurveillants').val(data.nbrSurveillants);
	$('#listDep').val(data.department.id);
	$('#listServ').val(data.service.id);
	
}