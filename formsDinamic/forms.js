formsapp = angular.module("formsdinamic");
formsapp.controller("makeForm",function($scope){
	$scope.data = {}
	$scope.forms = {
		name:"Form Name",
		submit:{
			text:"Action submit name eg. (Save)"
		},
		modules:[{
			title:"Titulo Modulo",
			name:"nombreModulo",
			type:"basic",
			open:true,
			fields:{rows:
				[
					[
						{
							id:1,
							type:'text',
							label:'field label',
							model:'model',
							name:'data',
							cols:5
						},
						{
							id:2,
							type:'text',
							label:'field 1 label',
							model:'model',
							name:'data1',
							cols:4
						},
						{
							id:3,
							type:'text',
							label:'field 2 label',
							model:'model',
							name:'data2',
							cols:3
						}
					],
					[
						{
							id:4,
							type:'text',
							label:'field 3 label',
							model:'model',
							name:'data',
							cols:3
						},
						{
							id:5,
							type:'text',
							label:'field 4 label',
							model:'model',
							name:'data1',
							cols:4
						},
						{
							id:6,
							type:'text',
							label:'field 5 label',
							model:'model',
							name:'data2',
							cols:5
						}
					]
				]
			}

		}]
	}


	//modules interaction
	$scope.module_types = ["basic","hasmany"]
	$scope.module_data = 
		{
			title:"",
			name:"",
			type:"basic",
			open:true
		}
	$scope.newModule = function(){
		$scope.module_data = 
		{
			title:"",
			name:"",
			type:"basic",
			open:true
		}
	}
	$scope.createModule = function(){
		var newModule = JSON.parse(JSON.stringify($scope.module_data));
		$scope.forms.modules.push(newModule);
	}
	$scope.selectModule = function(module){
		$scope.module_data = module;
	}

	$scope.modulemoveup 	= function(form,module){

			var pos = form.modules.indexOf(module)
			if(pos>0){
				var modulePosPrev = form.modules[pos -1];
				var module =form.modules[pos];
				form.modules[pos -1] = module;
				form.modules[pos]= modulePosPrev;
			}
		
	}
	$scope.modulemovedown 	= function(form,module){
			var pos = form.modules.indexOf(module)
			if(pos<form.modules.length-1 && pos>=0){
				var modulePosNext = form.modules[pos +1];
				var module =form.modules[pos];
				form.modules[pos +1] = module;
				form.modules[pos]= modulePosNext;
			}
	}
	// fields interaction
	$scope.row_selected = 0;

	$scope.addRow = function(){
		if($scope.module_data.fields == undefined)
			$scope.module_data.fields = {rows:[]}
		$scope.module_data.fields.rows.push([])
	}
	$scope.field_types = ["text","email","number","date","time","list","select"]
	$scope.field_data = {
							id:1,
							type:'text',
							label:'field label',
							model:'model',
							name:'data',
							cols:6
						}; 
	$scope.createField = function(){
		if($scope.module_data.fields == undefined)
			$scope.module_data.fields = {rows:[]}
		if($scope.module_data.fields.rows.length == 0)
			$scope.module_data.fields.rows.push([]);

		$scope.module_data.fields.rows[$scope.row_selected].push($scope.field_data);
	}
	//	move functions
	$scope.fieldmoveup = function(module,field){
		var rowPosition = -1
		//buscando fila de posicion
		for (i in module.fields.rows){
			var row = module.fields.rows[i]
			if(row.indexOf(field)>=0)
				rowPosition = parseInt(i)
		}
		if(rowPosition > 0){
			var row = module.fields.rows[rowPosition]
			var rowlast = module.fields.rows[rowPosition-1]
			var rowPosition = row.indexOf(field);
			var reffield = row[rowPosition];
			row[rowPosition] = undefined;
			row.splice(rowPosition, 1);
			rowlast.push(reffield);
		}


	}
	$scope.fieldmovedown = function(module,field){
		var rowPosition = parseInt(module.fields.rows.length) -1;
		//buscando fila de posicion
		for (i in module.fields.rows){
			var row = module.fields.rows[i]
			if(row.indexOf(field)>=0)
				rowPosition = parseInt(i)
		}
		if(rowPosition < module.fields.rows.length -1){
			var row = module.fields.rows[rowPosition]
			var rownext = module.fields.rows[rowPosition+1]
			var fieldPosition = row.indexOf(field);
			var reffield = row[fieldPosition];
			row[fieldPosition] = undefined;
			row.splice(fieldPosition, 1);
			rownext.push(reffield);
		}


	}
	$scope.fieldmoveleft = function(module,field){

		for (i in module.fields.rows){
			var row = module.fields.rows[i]
			var pos = row.indexOf(field)
			if(row.indexOf(field)>0){
				var fieldPosPrev = row[pos -1];
				var field = row[pos];
				row[pos -1] = field;
				row[pos]= fieldPosPrev ;
			}
		}
	}
	$scope.fieldmoverigth = function(module,field){

		for (i in module.fields.rows){
			var row = module.fields.rows[i]
			var pos = row.indexOf(field)
			if(pos>=0 && pos < row.length -1){
				var fieldPosNext = row[pos +1];
				var field = row[pos];
				row[pos +1] = field;
				row[pos]= fieldPosNext ;
			}
		}
	}
	$scope.newField = function(){
		$scope.field_data = 
		{
			id:1,
			type:'text',
			label:'field label',
			model:'model',
			name:'data',
			cols:6
		}; 
	}

	$scope.selectField = function(field){
		$scope.field_data = field
	}



	//hasmany functions
$scope.addHeader = function(module){
	if(module.display == undefined)
		module.display = []
	module.display.push({
							header:"Heder Title",
							name:"field_name",
							filters:[]
						})
}
	

});
formsapp.controller("formController",function($scope){
	
	$scope.save = function(){
		alert(JSON.stringify($scope.data));
	}
	$scope.countData = function(ModuleData){
		return Object.keys(ModuleData).length
	}
	$scope.hasmanyAddNew = function(module){
		module.data.selected = $scope.countData($scope.data[module.data.model][module.data.name]) + 1
	}
	$scope.data={
		persona:{
				nombre:"Daniel",
				edad:28,
				email:"adgranados@gmail.com",
				genero:"M",
				detalle:[],
				contacto:[
					{
						tipo:"Celular",
						numero:"3188725398",
						lugar:"Personal"
					},
					{
						tipo:"Fijo",
						numero:"(1)6302338",
						lugar:"Casa"
					},
					{
						tipo:"Fijo",
						numero:"(1)7560009 ext 1407",
						lugar:"Trabajo"
					},
				]
			}
		};
	$scope.forms =
		{
			name:"Persona",
			submit:{
				text:"Guardar Persona"
			},
			modules:[
						{
							title:"Datos Basicos Persona",
							name:"datosBasicos",
							type:"basic",
							open:true,

							fields:{
								rows:
								[
									[
										{
											id:1, 
											type:'text',   
											label:'Nombre', 
											model:'persona',  
											name:'nombre',
											cols:6, 
											macros:[
												{
													event:"blur",
													items:
													[
														{
															name:"upper",
															args:{
																model:"persona",
																name:"nombre"
															}
														},
														{
															name:"lower",
															args:{
																model:"persona",
																name:"email"
															}
														}
													]
												},{
													event:"load",
													items:
													[
														{
															name:"functions",
															args:{
																model:"persona",
																name:"detalle"
															}
														}

													]
												}
											]
										},
										{
											id:2, 
											type:'number', 
											label:'Edad',   
											model:'persona',  
											name:'edad',
											cols:6,
											macros:[
												{
													event:"blur",
													items:[
														{
															name:"maxLength",
															args:{
																model:"persona",
																name:"email",
																maxLength:10
															}
														}
													]
												}
											]
										}
									],
									[
										{
											id:3,
											type:'email',
											label:'Correo Electronico',
											model:'persona',
											name:'email',
											cols:6
										},
										{
											id:4, 
											type:'select', 
											label:'Género', 
											model:'persona', 
											name:'genero',
											cols:6,
											options:
											[
												{
													display:'Masculino',
													value:'M'
												},
												{
													display:'Femenino',
													value:'F'
												},		
											]

										}
									]
								]	
							}		
						},{
							title:"Datos Contacto",
							name:"datosContacto",
							type:"basic",
							open:false,
							fields:{
								rows:[
										[
												{
													id:5, 
													type:'select', 
													label:'Tipo', 
													model:'persona', 
													name:'tipoTelefono',
													cols:4,
													options:
													[
														{
															display:"Fijo",
															value:"fijo"
														},{
															display:"Movil",
															value:"movil"
														}
													]
												},
												{
													id:5, 
													type:'tel', 
													label:'telefono', 
													model:'persona', 
													name:'telefono',
													cols:4
												},
												{
													id:5, 
													type:'list', 
													label:'Detalle', 
													model:'persona', 
													name:'detalle',
													cols:4
												}
										]
								]
							}

						},{
							title:"Datos Contacto",
							name:"datosContacto",
							type:"hasmany",
							open:true,
							data:{
								model:"persona",
								name:"contacto",
								selected:0
							},
							display:
							[
								{
									header:"Tipo",
									name:"tipo",
									filters:[]
								},
								{
									header:"Número",
									name:"numero",
									filters:[]
								},
								{
									header:"Lugar",
									name:"lugar",
									filters:[]
								},
							],
							
							fields:{
								rows:[
										[
												{
													id:5, 
													type:'select', 
													label:'Tipo', 
													name:'tipo',
													cols:4,
													options:
													[
														{
															display:"Fijo",
															value:"fijo"
														},{
															display:"Movil",
															value:"movil"
														}
													]
												},
												{
													id:5, 
													type:'tel', 
													label:'Número', 
													name:'numero',
													cols:4
												},
												{
													id:5, 
													type:'text', 
													label:'Lugar',  
													name:'lugar',
													cols:4
												}
										]
								]
							}

						}
					]
		}


});