// The root URL for the RESTful services
var rootURLDep = "http://localhost:8080/MiniProject/rest/Department";

var currentDep = null;

$('#ajouterDep').click(function() {
	NProgress.start();
	$("#form").show();
    $("#list").hide();
    $("#Acceuil").hide();
	createDepForm();
	$("#nomForm").empty().append("ajouter un Department");
		
	
	new PNotify({
        title: 'Ajouter un Department',
        type: 'dark',
        text: 'L\'initialisation de ces données de bases est la première étape avant de pouvoir manipuler les différents modules de l\'application',
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        }
    });
	NProgress.done();
});
$('#AfficherDep').click(function() {
	NProgress.start();
	$("#list").show();
	$("#form").hide();
	$("#Acceuil").hide();
	findAllDep();
		new PNotify({
            title: 'Liste des Department',
            type: 'dark',
            text: 'vous pouver supprimer , modifier est supprimer des Department',
            nonblock: {
                nonblock: true,
                nonblock_opacity: .2
            }
        });
	
	NProgress.done();
});

function findAllDep() {
	NProgress.start();
	$('#listeNom').empty().append("Liste des etablissement" );
	$('#tab_content').empty().append("<table id=\"TabDep\" class=\"table table-striped responsive-utilities jambo_table\"></table>");
	$('#TabDep').empty().append("<thead>" +
				"<tr>"+
                "<th>Alias Etablissement</th>"+
                "<th>codeDep</th>"+
                "<th>description</th>"+
                "<th>nom Department en Francais</th>"+
                "<th>nom Department en arab</th>"+
                "<th>Action</th>"+
            "</tr>"+
			"</thead><tbody></tbody>");
	
	
	
	var oTable = $('#TabDep').dataTable({
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
		url: rootURLDep,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			$('#TabDep tbody').empty();
			
			$.each(data, function(index, dep) {
				oTable.fnAddData( [
				            dep.etablissement.aliasEtab,
				            dep.codeDep,
				            dep.description,
				            dep.nomDepFr,
				            dep.nomDepAr,
				            "<button id=\"DeleteDep\" value="+dep.id+" class=\"btn btn-danger pullleft\"> <i class=\"fa fa-trash\"></i></button>"+
				            "<button id=\"UpdataDep\" value="+dep.id+" class=\"btn btn-sucess pullrigth\"> <i class=\"fa fa-pencil-square-o\"></i> </button>"
				        ] );
				
			});
		}
		
	});

	$('#TabDep tbody').on( 'click', 'button', function () {
		var id =  $(this).val();
		if ($(this).attr('id') == "DeleteDep"){
			
			$.confirm({
			    title: 'Supprimer Department ?',
			    content: 'Tu est sur ?',
			    autoClose: 'cancel|6000',
			    confirm: function(){
			    	
			    	deleteDepartment(id);
			    },
			    cancel:function(){
			    	new PNotify({
		                title: 'Notification',
		                text: "le supprition de Department est annuler",
		                type: 'info',
		                hide: false
		            });
			    }
			});
		}else{
			
			$("#list").hide();
			$("#form").show();
			$("#nomForm").empty().append("modifier un Department");
			createDepForm();
			findByIdDep(id);
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

function findByIdDep(id) {
	$.ajax({
		type: 'GET',
		url: rootURLDep + '/' + id,
		dataType: "json",
		success: function(data){
			currentDep = data;
			renderDepDetail(currentDep);
		}
	});
}

function updateDepartment() {
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + $('.select2').val(),
		dataType: "json",
		success: function(data){
		$.ajax({
			type: 'PUT',
			contentType: 'application/json',
			url: rootURLDep + '/' + id,
			dataType: "json",
			data: formToJSONDep(data),
			success: function(data, textStatus, jqXHR){
				new PNotify({
	                title: 'Notification',
	                text: "Le Department est Modifier avec success",
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

function deleteDepartment(id) {
	$.ajax({
		type: 'DELETE',
		url: rootURLDep + '/' + id,
		success: function(data, textStatus, jqXHR){
			findAllDep();
			new PNotify({
                title: 'Notification',
                text: "Le Department est Supprimer avec success",
                type: 'success',
                hide: false
            });
		},
		error: function(jqXHR, textStatus, errorThrown){
			new PNotify({
                title: 'Notification',
                text: "cette Department a des salle ou bureaux ou labos",
                type: 'warning',
                hide: false
            });
		}
	});
}

function addDepartment() {
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + $('.select2').val(),
		dataType: "json",
		success: function(data){
			
			$.ajax({
				type: 'POST',
				contentType: 'application/json',
				url: rootURLDep,
				dataType: "json",
				data: formToJSONDep (data),
				success: function(data, textStatus, jqXHR){
					
					new PNotify({
		                title: 'Notification',
		                text: "Le Department est creé avec success",
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
	});
	
}

function createDepForm() {
	$("#form_content").empty();
	$("#form_content").append("<form id=\"ajoutFormDep\" action=\"\" method=\"post\" " +
			"class=\"form-horizontal\" role=\"form\">");
	$('#ajoutFormDep').append("<input type=\"hidden\" id=\"id\" class=\"form-control\">");
	$('#ajoutFormDep').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label \">Code department</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"codeDep\" class=\"form-control validDep\" placeholder=\"Code department\" value=\"\"></div></div>");
	$('#ajoutFormDep').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label \">Nom de department en Francais</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nomDepFr\" class=\"form-control validDep\" placeholder=\"Nom de department en Francais\" value=\"\"></div></div>");
	$('#ajoutFormDep').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label \">>Nom de department en arab</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nomDepAr\" class=\"form-control validDep\" placeholder=\"Nom de department en arab\" value=\"\"></div></div>");
	$('#ajoutFormDep').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label \">description</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"description\" class=\"form-control validDep\" placeholder=\"description\" value=\"\"></div></div>");
	createSelectForm('#ajoutFormDep');
	$('#ajoutFormDep').append("<div class=\"form-group\"><div class=\"col-sm-offset-3 col-sm-4\"><button id=\"valideDep\" class=\"btn btn-default\"> <i class=\"fa fa-check\"></i> Ajouter </button><button type=\"reset\" class=\"btn btn-danger\"><i class=\"fa fa-times-circle\"></i> Annuler</button></div></div>");
	
	$("#form_content").append("</form>");
	
	$('#ajoutFormDep').bootstrapValidator({
        feedbackIcons: {
        	valid: 'fa fa-thumbs-up',
            invalid: 'fa fa-thumbs-o-down',
            validating: 'fa fa-spinner'
        },
        fields: {
        	validDepChaine: {
                selector: '.validDep',
                validators: {
                    notEmpty: {
                    }
                    
                }
            },validDeplist: {
                selector: '.select2',
                validators: {
                    notEmpty: {
                    }
                    
                }
            }
        }
    }).on('success.form.bv', function(e) {
    	if ($('#id').val() == '')
    	addDepartment();
		else
		updateDepartment($('#id').val());
    	return true;
    });
	
}


function formToJSONDep (data){
	var depId = $('#id').val();
	return JSON.stringify({
				"id"				: depId == "" ? null : depId, 
				"codeDep"   		: $('#codeDep').val(), 
				"description"		: $('#description').val(), 
				"nomDepFr"			: $('#nomDepFr').val(), 
				"nomDepAr"			: $('#nomDepAr').val(),
				"etablissement"     : data,
				});
}

function renderDepDetail(data) {
	$('#id').val(data.id);
	$('#codeDep').val(data.codeDep);
	$('#description').val(data.description);
	$('#nomDepFr').val(data.nomDepFr);
	$('#nomDepAr').val(data.nomDepAr);
	$('.select2').val(data.etablissement.id);
}

function createSelectFormDep(selecteur) {
	$(selecteur).append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label \">" +
			"Liste de department</label>" +
			"<div class=\"col-sm-8\">" +
			"<select id=\"listDep\" class=\"select2 form-control\" ></select>");
	$("#listDep").append("<option selected value=\" \">-- selection un department --</option>");
	$.ajax({
		type: 'GET',
		url: rootURLDep,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			
			$.each(data, function(index, dep) {
				$("#listDep").append("<option value="+dep.id+">"+dep.nomDepFr+"</option>");
			});
			
		}
		
	});
	
}