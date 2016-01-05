// The root URL for the RESTful services
var rootURLBureaux = "http://localhost:8080/MiniProject/rest/Bureaux";

var currentBureaux;

$('#ajouterBureaux').click(function() {
	NProgress.start();
	$("#form").show();
    $("#list").hide();
    $("#Acceuil").hide();
	createBureauxForm();
	$("#nomForm").empty().append("ajouter un Bureaux");
	
	new PNotify({
        title: 'Ajouter un Bureaux',
        type: 'dark',
        text: 'L\'initialisation de ces données de bases est la première étape avant de pouvoir manipuler les différents modules de l\'application',
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        }
    });
	NProgress.done();
});
$('#AfficherBureaux').click(function() {
	NProgress.start();
	$("#list").show();
	$("#form").hide();
	$("#Acceuil").hide();
	findAllBureaux();
		new PNotify({
            title: 'Liste des Bureaux',
            type: 'dark',
            text: 'vous pouver supprimer , modifier est supprimer des Bureaux',
            nonblock: {
                nonblock: true,
                nonblock_opacity: .2
            }
        });
	
	NProgress.done();
});

function findAllBureaux() {
	NProgress.start();
	$('#listeNom').empty().append("Liste des Bureaux" );
	$('#tab_content').empty().append("<table id=\"TabBureaux\" class=\"table table-striped responsive-utilities jambo_table\"></table>");
	$('#TabBureaux').empty().append("<thead>" +
				"<tr>"+
                "<th>nom Deprtment en Francais</th>"+
                "<th>nom Local</th>"+
                "<th>design Bureaux</th>"+
                "<th>design Service</th>"+
                "<th>Action</th>"+
            "</tr>"+
			"</thead><tbody></tbody>");
	
	
	
	var oTable = $('#TabBureaux').dataTable({
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
		url: rootURLBureaux,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			$('#TabBureaux tbody').empty();
			
			$.each(data, function(index, bureaux) {
				oTable.fnAddData( [
				            bureaux.department.nomDepFr,
				            bureaux.nomLocal,
				            bureaux.designBureaux,
				            bureaux.service.designService,
				            "<button id=\"DeleteBureaux\" value="+bureaux.id+" class=\"btn btn-danger pullleft\"> <i class=\"fa fa-trash\"></i></button>"+
				            "<button id=\"UpdataBureaux\" value="+bureaux.id+" class=\"btn btn-sucess pullrigth\"> <i class=\"fa fa-pencil-square-o\"></i> </button>"
				        ] );
				
			});
		}
		
	});

	$('#TabBureaux tbody').on( 'click', 'button', function () {
		var id =  $(this).val();
		if ($(this).attr('id') == "DeleteBureaux"){
			
			$.confirm({
			    title: 'Supprimer Bureaux ?',
			    content: 'Tu est sur ?',
			    autoClose: 'cancel|6000',
			    confirm: function(){
			    	
			    	deleteBureaux(id);
			    },
			    cancel:function(){
			    	new PNotify({
		                title: 'Notification',
		                text: "le supprition de Bureaux est annuler",
		                type: 'info',
		                hide: false
		            });
			    }
			});
		}else{
			
			$("#list").hide();
			$("#form").show();
			$("#nomForm").empty().append("modifier un Bureaux");
			createBureauxForm();
			findByIdBureaux(id);
			new PNotify({
		        title: 'Modifier un Bureaux',
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

function deleteBureaux(id){
	$.ajax({
		type: 'DELETE',
		url: rootURLBureaux + '/' + id,
		success: function(data, textStatus, jqXHR){
			findAllBureaux();
			new PNotify({
                title: 'Notification',
                text: "Le Bureaux est Supprimer avec success",
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

function findByIdBureaux(id) {
	$.ajax({
		type: 'GET',
		url: rootURLBureaux + '/' + id,
		dataType: "json",
		success: function(data){
			currentBureaux = data;
			renderDetailBureaux(currentBureaux);
		}
	});
}

function updateBureaux(id) {
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
						url: rootURLBureaux + '/' + id,
						dataType: "json",
						data: formToJSONBureaux(serv,dep),
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

function addBureaux() {
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
						url: rootURLBureaux,
						dataType: "json",
						data: formToJSONBureaux(serv,dep),
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

function createBureauxForm() {
	$("#form_content").empty();
	$("#form_content").append("<form id=\"ajoutFormBureaux\" action=\"\" method=\"post\" " +
			"class=\"form-horizontal\" role=\"form\">");
	$('#ajoutFormBureaux').append("<input type=\"hidden\" id=\"id\" class=\"form-control\">");
	$('#ajoutFormBureaux').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">design Bureaux</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"designBureaux\" class=\"form-control validServ\" placeholder=\"design Bureaux\" value=\"\"></div></div>");
	$('#ajoutFormBureaux').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">nom Local</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"nomLocal\" class=\"form-control validServ\" placeholder=\"nom Local\" value=\"\"></div></div>");
	createSelectFormDep('#ajoutFormBureaux');
	createSelectFormServ('#ajoutFormBureaux') ;
	$('#ajoutFormBureaux').append("<div class=\"form-group\"><div class=\"col-sm-offset-3 col-sm-4\"><button type=\"type\" class=\"btn btn-default\"> <i class=\"fa fa-check\"></i> Ajouter </button><button type=\"reset\" class=\"btn btn-danger\"><i class=\"fa fa-times-circle\"></i> Annuler</button></div></div>");
	
	$('#ajoutFormBureaux').bootstrapValidator({
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
			addBureaux();
		else
			updateBureaux($('#id').val());
		return true;
    });
	
}

// Helper function to serialize all the form fields into a JSON string
function formToJSONBureaux(serv,dep) {
	var BureauxId = $('#id').val();
	return JSON.stringify({
	"id"				: BureauxId == "" ? null : BureauxId, 
	"designBureaux"   	: $('#designBureaux').val(),
	"nomLocal"			: $('#nomLocal').val(),
	"service"     		: serv,
	"department"     	: dep
	});
}

function renderDetailBureaux(data) {
	$('#id').val(data.id);
	$('#designBureaux').val(data.designBureaux);
	$('#nomLocal').val(data.nomLocal);
	$('#listDep').val(data.department.id);
	$('#listServ').val(data.service.id);
}

