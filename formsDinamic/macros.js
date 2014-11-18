formsapp = angular.module("formsdinamic");

formsapp.factory("macros_factory",function($q){
	var functions =  {
			functions:function (scope, element, attributes, parentController, args) {
				return function(){
				  return $q(function(resolve, reject) {
				  	//element.val(element.val().toUpperCase());
				  	scope.$parent.data[args.model][args.name] = Object.keys(functions);
				  	//scope.$parent.$apply();
				  	resolve("Macrofunctions: " + JSON.stringify(scope.$parent.data[args.model][args.name]));
				  });
				}
			},
			upper:function (scope, element, attributes, parentController, args) {
				return function(){
				  return $q(function(resolve, reject) {
				  	//element.val(element.val().toUpperCase());
				  	scope.$parent.data[args.model][args.name] = scope.$parent.data[args.model][args.name].toUpperCase();
				  	//scope.$parent.$apply();
				  	resolve("MacroUpper: " + scope.$parent.data[args.model][args.name]);
				  });
				}
			},
			lower:function (scope, element, attributes, parentController, args) {
				return function(){
				  return $q(function(resolve, reject) {
				  	//element.val(element.val().toLowerCase());
				  	scope.$parent.data[args.model][args.name] = scope.$parent.data[args.model][args.name].toLowerCase();
				  	//scope.$parent.$apply();
				  	resolve("MacroLower: " + scope.$parent.data[args.model][args.name]);
				  });
				}
			},
			maxLength:function (scope, element, attributes, parentController, args) {
				return function(){
				  return $q(function(resolve, reject) {
				  	
				  	if( scope.$parent.data[args.model][args.name].length > args.maxLength)
				  		scope.$parent.data[args.model][args.name] = scope.$parent.data[args.model][args.name].substring(0,args.maxLength - 1);
				  	
				  	resolve("MacroMaxLength: " + scope.$parent.data[args.model][args.name]);
				  });
				}
			},
			minLength:function (scope, element, attributes, parentController, args) {
				return function(){
				  return $q(function(resolve, reject) {
				  	
				  	if( scope.$parent.data[args.model][args.name].length < args.minLength)
				  		scope.$parent.data[args.model][args.name] = scope.$parent.data[args.model][args.name].substring(0,args.minLength - 1);
				  	
				  	resolve("MacroMaxLength: " + scope.$parent.data[args.model][args.name]);
				  });
				}
			},
	}
	return functions;
})