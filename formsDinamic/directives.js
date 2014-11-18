formsapp = angular.module("formsdinamic");
formsapp.directive('macros', function (macros_factory) {
    return {
        restrict: "A",
        transclude: false,
        scope:{
        	macrosData:"@"
        },
        link: function (scope, element, attributes, parentController) {
        	var macros = undefined
        	if(scope.macrosData != "")
        		macros = JSON.parse(scope.macrosData);
        	var events = {}
        	var events_headers = []
        	if(macros != undefined){
	        	for (var i = 	macros.length - 1; i >= 0; i--) {
	        		
	        		/**
	        			RECORRER MACROS POR EVENTOS Y AGRUPAR POR EVENTOS:
	        		*/
	        		if(events[macros[i].event] == undefined ){
	        			events[macros[i].event] = [];
	        			events_headers.push(macros[i].event)
	        		}
	        		for (var j = 	macros[i].items.length - 1; j >= 0; j--) {
	        			events[macros[i].event].push(macros[i].items[j]);
	        		}
	        	};	
	        	console.log(events_headers);	
	        	console.log(events);


	        	exec_event_promise = function(scope, element, attributes, parentController,event_header, events){

	        			if(events != undefined && events[event_header].length > 0){
	        				var c_events = JSON.parse( JSON.stringify( events ) );//copy events
	        				var macro = c_events[event_header].shift();
	        				var promise = macros_factory[macro.name](scope, element, attributes, parentController,macro.args);
							promise().then(function(state_data) {
							  console.log('Success: ' + state_data);
							  exec_event_promise(scope, element, attributes, parentController, event_header, c_events)	
							}, function(reason) {
							  console.error('Failed: ' + reason);
							});
	        			}
	        		}

	        	for(event_header in events_headers){
	        		var event_header_data = events_headers[event_header].toString();
	        		if(event_header_data === "load"){
	        			exec_event_promise(scope, element, attributes, parentController,event_header_data, events);
	        		}else{	
			            element.on(events_headers[event_header], function () {
			                exec_event_promise(scope, element, attributes, parentController,event_header_data, events);
			            });
	        		}
	        	}
        	}

        }
    }
});