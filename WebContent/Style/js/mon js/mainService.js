// The root URL for the RESTful services
var rootURLServ = "http://localhost:8080/MiniProject/rest/Service";

var currentServ = null;

$('#ajouterServ').click(function() {
	NProgress.start();
	$("#form").show();
	$("#Acceuil").hide();
    $("#list").hide();
	createServiceForm();
	$("#nomForm").empty().append("ajouter un Service");
	
	new PNotify({
        title: 'Ajouter un Service',
        type: 'dark',
        text: 'L\'initialisation de ces données de bases est la première étape avant de pouvoir manipuler les différents modules de l\'application',
        nonblock: {
            nonblock: true,
            nonblock_opacity: .2
        }
    });
	NProgress.done();
});
$('#AfficherServ').click(function() {
	NProgress.start();
	$("#list").show();
	$("#Acceuil").hide();
	$("#form").hide();
	findAllServ();
		new PNotify({
            title: 'Liste des Service',
            type: 'dark',
            text: 'vous pouver supprimer , modifier est supprimer des Service',
            nonblock: {
                nonblock: true,
                nonblock_opacity: .2
            }
        });
	
	NProgress.done();
});

function findAllServ() {
	NProgress.start();
	$('#listeNom').empty().append("Liste des Service" );
	$('#tab_content').empty().append("<table id=\"TabServ\" class=\"table table-striped responsive-utilities jambo_table\"></table>");
	$('#TabServ').empty().append("<thead>" +
				"<tr>"+
                "<th>Alias Etablissement</th>"+
                "<th>E-mail</th>"+
                "<th>Fax</th>"+
                "<th>Téléphone</th>"+
                "<th>Adresse</th>"+
                "<th>Ville en Francais</th>"+
                "<th>design Service</th>"+
                "<th>Action</th>"+
            "</tr>"+
			"</thead><tbody></tbody>");
	
	
	
	var oTable = $('#TabServ').dataTable({
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
		url: rootURLServ,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			$('#TabServ tbody').empty();
			
			$.each(data, function(index, serv) {
				oTable.fnAddData( [
				            serv.etablissement.aliasEtab,
				            serv.etablissement.email,
				            serv.etablissement.fax,
				            serv.etablissement.tel,
				            serv.etablissement.adresse,
				            serv.etablissement.villeFr,
				            serv.designService,
				            "<button id=\"DeleteServ\" value="+serv.id+" class=\"btn btn-danger pullleft\"> <i class=\"fa fa-trash\"></i></button>"+
				            "<button id=\"UpdataServ\" value="+serv.id+" class=\"btn btn-sucess pullrigth\"> <i class=\"fa fa-pencil-square-o\"></i> </button>"
				        ] );
				
			});
		}
		
	});

	$('#TabServ tbody').on( 'click', 'button', function () {
		var id =  $(this).val();
		if ($(this).attr('id') == "DeleteServ"){
			
			$.confirm({
			    title: 'Supprimer Service ?',
			    content: 'Tu est sur ?',
			    autoClose: 'cancel|6000',
			    confirm: function(){
			    	
			    	deleteService(id);
			    },
			    cancel:function(){
			    	new PNotify({
		                title: 'Notification',
		                text: "le supprition de Service est annuler",
		                type: 'info',
		                hide: false
		            });
			    }
			});
		}else{
			
			$("#list").hide();
			$("#form").show();
			$("#nomForm").empty().append("modifier un Service");
			createServiceForm();
			findByIdServ(id);
			new PNotify({
		        title: 'Modifier un Service',
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

function deleteService(id){
	$.ajax({
		type: 'DELETE',
		url: rootURLServ + '/' + id,
		success: function(data, textStatus, jqXHR){
			findAllServ();
			new PNotify({
                title: 'Notification',
                text: "Le Service est Supprimer avec success",
                type: 'success',
                hide: false
            });
		},
		error: function(jqXHR, textStatus, errorThrown){
			new PNotify({
                title: 'Notification',
                text: "cette Service a des salle ou bureaux ou labos",
                type: 'warning',
                hide: false
            });
		}
	});
}

function findByIdServ(id) {
	$.ajax({
		type: 'GET',
		url: rootURLServ + '/' + id,
		dataType: "json",
		success: function(data){
			currentServ = data;
			renderServDetail(currentServ);
		}
	});
}

function updateServ(id) {
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + $('.select2').val(),
		dataType: "json",
		success: function(data){
		$.ajax({
			type: 'PUT',
			contentType: 'application/json',
			url: rootURLServ + '/' + id,
			dataType: "json",
			data: formToJSONServ(data),
			success: function(data, textStatus, jqXHR){
				new PNotify({
	                title: 'Notification',
	                text: "Le Service est Modifier avec success",
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

function addService() {
	$.ajax({
		type: 'GET',
		url: rootURL + '/' + $('.select2').val(),
		dataType: "json",
		success: function(data){
		$.ajax({
			type: 'POST',
			contentType: 'application/json',
			url: rootURLServ,
			dataType: "json",
			data: formToJSONServ(data),
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

function createServiceForm() {
	$("#form_content").empty();
	$("#form_content").append("<form id=\"ajoutFormServ\" action=\"\" method=\"post\" " +
			"class=\"form-horizontal\" role=\"form\">");
	$('#ajoutFormServ').append("<input type=\"hidden\" id=\"id\" class=\"form-control\">");
	$('#ajoutFormServ').append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label\">design Service</label> <div class=\"col-sm-8\"><input type=\"text\" id=\"designService\" class=\"form-control validServ\" placeholder=\"design Service\" value=\"\"></div></div>");
	createSelectForm('#ajoutFormServ');
	$('#ajoutFormServ').append("<div class=\"form-group\"><div class=\"col-sm-offset-3 col-sm-4\"><button type=\"type\" class=\"btn btn-default\"> <i class=\"fa fa-check\"></i> Ajouter </button><button type=\"reset\" class=\"btn btn-danger\"><i class=\"fa fa-times-circle\"></i> Annuler</button></div></div>");
	
	$('#ajoutFormServ').bootstrapValidator({
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
    		
			addService();
		else
			updateServ($('#id').val());
		return true;
    });
	
}

// Helper function to serialize all the form fields into a JSON string
function formToJSONServ(data) {
	var etabId = $('#id').val();
	return JSON.stringify({
	"id"				: etabId == "" ? null : etabId, 
	"designService"   	: $('#designService').val(), 
	"etablissement"     : data
	});
}

function renderServDetail(data) {
	$('#id').val(data.id);
	$('#designService').val(data.designService);
	$('.select2').val(data.etablissement.id);
}

function createSelectFormServ(selecteur) {
	$(selecteur).append("<div class=\"form-group\"> <label class=\"col-sm-3 control-label \">" +
			"Liste de Service</label>" +
			"<div class=\"col-sm-8\">" +
			"<select id=\"listServ\" class=\"select2 form-control\" ></select>");
	$("#listServ").append("<option selected value=\" \">-- selection un Service --</option>");
	$.ajax({
		type: 'GET',
		url: rootURLServ,
		dataType: "json",
		success: function(data, textStatus, jqXHR){
			
			$.each(data, function(index, serv) {
				$("#listServ").append("<option value="+serv.id+">"+serv.designService+"</option>");
			});
			
		}
		
	});
	
}