// The root URL for the RESTful services
var rootURLLabo = "http://localhost:8080/MiniProject/rest/Labo";

var currentLabo;

$('#ajouterLabos').click(function() {
	NProgress.start();
	$("#form").show();
	$("#Acceuil").hide();
    $("#list").hide();
	createLaboForm();
	$("#nomForm").empty().append("ajouter un Labo");
	
	new PNotify({
        title: 'Ajouter un Labo',
        type: 'dark',
        text: 'L\'initialisation de ces données de bases est la première étape avant de pouvoir manipuler les différents modules de l\'application',
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        }
    });
	NProgress.done();
});
$('#AfficherLabos').click(function() {
	NProgress.start();
	$("#list").show();
	$("#Acceuil").hide();
	$("#form").hide();
	findAllLabo();
		new PNotify({
            title: 'Liste des Labos',
            type: 'dark',
            text: 'vous pouver supprimer , modifier est supprimer des Labos',
            nonblock: {
                nonblock: true,
                nonblock_opacity: .2
            }
        });
	
	NProgress.done();
});

function findAllLabo() {
	NProgress.start();
	$('#listeNom').empty().append("Liste des Labo" );
	$('#tab_content').empty().append("<table id=\"TabLabo\" class=\"table table-striped responsive-utilities jambo_table\"></table>");
	$('#TabLabo').empty().append("<thead>" +
				"<tr>"+
                "<th>nom Deprtment en Francais</th>"+
                "<th>nom Local</th>"+
                "<th>design Labo</th>"+
                "<th>design Service</th>"+
                "<th>Action</th>"+
            "</tr>"+
			"</thead><tbody></tbody>");
	
	
	
	var oTable = $('#TabLabo').dataTable({
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
		url: rootURLLabo,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			$('#TabBureaux tbody').empty();
			
			$.each(data, function(index, labo) {
				oTable.fnAddData( [
				            labo.department.nomDepFr,
				            labo.nomLocal,
				            labo.designLabo,
				            labo.service.designService,
				            "<button id=\"DeleteLabo\" value="+labo.id+" class=\"btn btn-danger pullleft\"> <i class=\"fa fa-trash\"></i></button>"+
				            "<button id=\"UpdataLabo\" value="+labo.id+" class=\"btn btn-sucess pullrigth\"> <i class=\"fa fa-pencil-square-o\"></i> </button>"
				        ] );
				
			});
		}
		
	});

	$('#TabLabo tbody').on( 'click', 'button', function () {
		var id =  $(this).val();
		if ($(this).attr('id') == "DeleteLabo"){
			
			$.confirm({
			    title: 'Supprimer Labo ?',
			    content: 'Tu est sur ?',
			    autoClose: 'cancel|6000',
			    confirm: function(){
			    	
			    	deleteLabo(id);
			    },
			    cancel:function(){
			    	new PNotify({
		                title: 'Notification',
		                text: "le supprition de Labo est annuler",
		                type: 'info',
		                hide: false
		            });
			    }
			});
		}else{
			
			$("#list").hide();
			$("#form").show();
			$("#nomForm").empty().append("modifier un Labo");
			createLaboForm();
			findByIdLabo(id);
			new PNotify({
		        title: 'Modifier un Labo',
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

function deleteLabo(id){
	$.ajax({
		type: 'DELETE',
		url: rootURLLabo + '/' + id,
		success: function(data, textStatus, jqXHR){
			findAllLabo();
			new PNotify({
                title: 'Notification',
                text: "Le Labo est creé avec success",
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

function findByIdLabo(id) {
	$.ajax({
		type: 'GET',
		url: rootURLLabo + '/' + id,
		dataType: "json",
		success: function(data){
			currentLabo = data;
			renderDetailLabo(currentLabo);
		}
	});
}


function addLabo() {
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
						url: rootURLLabo,
						dataType: "json",
						data: formToJSONLabo(serv, dep),
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

function updateLabo() {
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
						url: rootURLLabo + '/' + id,
						dataType: "json",
						data: formToJSONLabo(serv, dep),
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

function createLaboForm() {
	$("#form_content").empty();
	$("#form_content").append("<form id=\"ajoutFormLabo\" action=\"\" method=\"post\" " +
			"class=\"form-horizontal\" role=\"form\">");
	$('#ajoutFormLabo').append("<input type=\"hidden\" id=\"id\" class=\"form-control\">");
	$('#ajoutFormLabo').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">design Labo</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"designLabo\" class=\"form-control validServ\" placeholder=\"design Labo\" value=\"\"></div></div>");
	$('#ajoutFormLabo').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nom Local</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nomLocal\" class=\"form-control validServ\" placeholder=\"nom Local\" value=\"\"></div></div>");
	createSelectFormDep('#ajoutFormLabo');
	createSelectFormServ('#ajoutFormLabo') ;
	$('#ajoutFormLabo').append("<div class=\"form-group\"><div class=\"col-sm-offset-3 col-sm-4\"><button type=\"type\" class=\"btn btn-default\"> <i class=\"fa fa-check\"></i> Ajouter </button><button type=\"reset\" class=\"btn btn-danger\"><i class=\"fa fa-times-circle\"></i> Annuler</button></div></div>");
	
	$('#ajoutFormLabo').bootstrapValidator({
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
    		
			addLabo();
		else
			updateLabo($('#id').val());
		return true;
    });
	
}

function formToJSONLabo(serv,dep) {
	var LaboId = $('#id').val();
	return JSON.stringify({
	"id"				: LaboId == "" ? null : LaboId, 
	"designLabo"   	: $('#designLabo').val(),
	"nomLocal"			: $('#nomLocal').val(),
	"service"     		: serv,
	"department"     	: dep
	});
	
}

function renderDetailLabo(data) {
	$('#id').val(data.id);
	$('#designLabo').val(data.designLabo);
	$('#nomLocal').val(data.nomLocal);
	$('#listDep').val(data.department.id);
	$('#listServ').val(data.service.id);
	
}