(function () {
	'use strict';

	angular.module( 'App')
	.factory('spinnerService', spinnerService)

	function spinnerService(){
		var spinners = {};
		return {
			// private method for spinner registration.
			register: function (data) {
				console.log('data = ' +  JSON.stringify(data, null, '\t'));

				if (!data.hasOwnProperty('name')) {
					throw new Error("Spinner must specify a name when registering with the spinner service.");
				}

				// TODO : Pages are not being cached. spinning state goes missing ?
				if (spinners.hasOwnProperty(data.name)) {
					// throw new Error("A spinner with the name '" + data.name + "' has already been registered.");
				}

				// console.log('spinners[data.name] = ' + JSON.stringify(spinners[data.name], null, '\t'));
				spinners[data.name] = data;
				console.log('spinners = ' + JSON.stringify(spinners, null, '\t'));
			},
			unregister: function (name) {
        if (spinners.hasOwnProperty(name)) {
          delete spinners[name];
        }
      },
			hide: function(name){
				console.log('hide : ' + name);
				var spinner = spinners[name];
        if (!spinner) {
          throw new Error("No spinner named '" + name + "' is registered.");
        }
        spinner.hide();
				//Looking up elements via selectors is not supported by jqLite! See:
				// if( !angular.element('#'+name)){
				// 	console.log('angular.element(#'+name+') unknown' );
				// }
				// angular.element('#'+name).hide()
			},
			show: function(name){
				console.log('show : ' + name);
				var spinner = spinners[name];
        if (!spinner) {
          // throw new Error("No spinner named '" + name + "' is registered.");
        }

				spinner.show();
				// if( !angular.element('#'+name)){
				// 	console.log('angular.element(#'+name+') unknown' );
				// }
				// angular.element('#'+name).show()
			},
			showAll: function () {
        for (var name in spinners) {
          spinners[name].show();
        }
      },
      hideAll: function () {
        for (var name in spinners) {
          spinners[name].hide();
        }
      }
		};
	}
})();
