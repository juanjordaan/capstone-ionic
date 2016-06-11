(function () {
	'use strict';

  angular.module( 'App')
  .factory('SpinnerService', SpinnerService)

  function SpinnerService(){
    var fn = {
      isShow: isShow,
			show: show,
			hide: hide
    }

		var show = "display:none;";

		function isShow(){
			return show;
		}

		function show(){
			return show = "font-size:20px;display:inline-block;stroke:#ff0000;";
		}

		function hide(){
			return show = "display:none;";
		}

    return fn;
  }
})();
