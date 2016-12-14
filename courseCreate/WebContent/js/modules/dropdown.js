/* =====================
 *  下拉式選單
 *
 *  @auther: Gray
 *  @time: 2015/10/15
 * ===================== */

angular.module("ngDropdown", [])

.directive('openDropdown', [ '$rootScope' , function($rootScope) {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {

	    	var side = 'auto',
	    		disable = false,
	    		showDropdOverlay = true,
	    		isFixed = false,
	    		$dropdown = [],
	    		$dropdownOverlay = $("<div class='dropdown-overlay'></div>"),
	    		openClass = undefined,
	    		sidebarWidth = $('#siderbar').width() || 0;

	    	// 點擊按鈕會顯示dropdown的內容
	    	element.bind('click.dropdown', function(event){
				event.stopPropagation();
				// 點擊的時候在binding比較不會發生錯誤
				side = attrs.side || 'auto';
				disable = attrs.dropdownDisable == "true" ? true:false;
				showDropdOverlay = attrs.dropdOverlay == "true" ? true:false;
				isFixed = attrs.dropdownFixed == "true" ? true:false;
				console.log("click");
				if(disable){
					return;
				}

				$dropdown = $('[dropdown="' + attrs.openDropdown + '"]');
				openClass = $dropdown.data('openClass');

				if($dropdown.has(event.target).length > 0 || $(event.target).attr('dropdown') == attrs.openDropdown){
					return;
				}

				// 先檢查目前點擊的是開啟狀態還是關閉狀態
				var isOpen = false;
				if(element.data('dropdownActive')){
					isOpen = true;
				}

				console.log(element)
				console.log(element.data('dropdownActive'));

				// 先關閉其他的dropdown
				var $dropdowns = $('[dropdown]');
				$dropdowns.each(function(trigger) {
					var openClass = $(this).data('openClass');
					if(openClass){
						$(this).removeClass(openClass);
					}else{
						$(this).hide();
					}
					$('.dropdown-overlay').remove();
				});
				$('[open-dropdown]').data('dropdownActive', false);

				if(!isOpen){
					if($dropdown.length > 1){
						for(var i = 0 ; i < $dropdown.length ; i++){
							if($($dropdown[i]).width() > 0){
								$dropdown = $($dropdown[i]);
								break;
							}
						}
					}

					if(element.has($dropdown).length == 0){
						setPosition(event);
					}

					if(openClass){
						$dropdown.addClass(openClass);
					}else{
						$dropdown.show();
					}

					if(showDropdOverlay){
						requestAnimationFrame(function(){
							$dropdown.before($dropdownOverlay); // 加一個隱形的框架在畫面上，防止關閉dropdown事件跟其他衝突
						});
					}
					element.data('dropdownActive', true);

					$(document).off('click.dropdown').on('click.dropdown', function onDropdownClick(event){

			    		var $parent = $dropdown.has(event.target);
			    		if($parent.length > 0 || $(event.target).attr('dropdown') == attrs.openDropdown){
			    			return;
			    		}

			    		if(openClass){
			    			$dropdown.removeClass(openClass);
			    		}else{
			    			$dropdown.hide();
			    		}

						$('.dropdown-overlay').remove();
						$(document).off('click.dropdown');
						$(window).off('resize.dropdown');
			    		element.data('dropdownActive', false);
			    		$rootScope.$broadcast("DROPDOWN_CLOSE", attrs.openDropdown);
			    	});

					$(window).off('resize.dropdown').on('resize.dropdown', function(){
			    		setPosition();
			    	});
				}
	    	});

	    	function setPosition(event){
	    		var $parent = element.parent(),
	    			elemHeight = element.outerHeight(),
	    			elemWidth = element.outerWidth(),
	    			elemPosition = element.position(),
	    			elemMarginTop = parseInt(element.css('margin-top')),
	    			elemMarginLeft = parseInt(element.css('margin-left')),
	    			dropdownWidth = $dropdown.outerWidth(),
	    			dropdownHeight = $dropdown.outerHeight(),
	    			documentWidth = $(document).outerWidth(),
	    			documentHeight = $(document).outerHeight(),
	    			dropdownTop = 0,
	    			dropdownLeft = 0,
	    			positionType = $dropdown.attr('position-type') || element.attr('position-type'),
	    			isAutoArrow = $dropdown.attr('auto-arrow');

	    		if(isFixed){
	    			var offset = element.offset(),
	    				scrollTop = $(window).scrollTop(),
	    				scrollLeft = $(window).scrollLeft();

	    			dropdownTop = offset.top + elemHeight + elemMarginTop - scrollTop; // 不知道為什麼fixed會自動將scrollTop計算進去？
					dropdownLeft = offset.left + elemMarginLeft - scrollLeft;

					if(dropdownLeft + dropdownWidth > $(window).width()) {
						dropdownLeft = $(window).width() - dropdownWidth;
					}

					requestAnimationFrame(function(){
						$dropdown.css({
							'top': dropdownTop,
							'left': dropdownLeft,
							'position': 'fixed'
						});
					});
	    		} else {
	    			if(element.has($dropdown).length > 0){
		    			dropdownTop = elemHeight;
		    		}else if($parent.has($dropdown).length == 0){
		    			// dropdownTop = element.offset().top + elemMarginTop;
		    			// dropdownLeft = element.offset().left + elemMarginLeft;
		    			dropdownTop += elemPosition.top + elemHeight + elemMarginTop;
		    			dropdownLeft += elemPosition.left + elemMarginLeft;
		    			do{
		    				var parentPosition = $parent.position(),
		    					positionCss = $parent.css('position');
		    				
		    				if(positionCss === 'relative' || positionCss === 'absolute' || positionCss === 'fixed'){
			    				dropdownTop += $parent.position().top + parseInt($parent.css('margin-top'));
			    				dropdownLeft += $parent.position().left + parseInt($parent.css('margin-left'));
		    				}
		    				$parent = $parent.parent();

		    			}while($parent.has($dropdown).length == 0);

		    		}else{
		    			dropdownTop = elemPosition.top + elemHeight + elemMarginTop;
		    			dropdownLeft = elemPosition.left + elemMarginLeft;
		    		}

		    		if(side === 'left'){
		    			dropdownLeft = dropdownLeft - dropdownWidth + elemWidth;
		    		}

		    		// 若是dropdown超出螢幕的話要縮回來
		    		if(positionType == 'auto') {
		    			var libidebarWidth = $('#library').find('.sidebar').width();

			    		var elementOffset = element.offset();

			    		if(dropdownLeft + dropdownWidth + libidebarWidth + sidebarWidth > documentWidth){
			    			dropdownLeft = dropdownLeft - dropdownWidth + elemWidth;
			    		}
			    		if(dropdownTop + dropdownHeight + $parent.offset().top > scrollY + window.innerHeight){
			    			dropdownTop = dropdownTop - dropdownHeight - elemHeight;
		    			}
		    		} else if(positionType == 'mouse' && event) {
		    			var libidebarWidth = $('#library').find('.sidebar').width();

		    			dropdownLeft = event.clientX;
		    			dropdownTop = event.clientY + scrollY;

		    			if(dropdownLeft + dropdownWidth + 10 > documentWidth){
			    			dropdownLeft = documentWidth - dropdownWidth - 10;
			    		}

			    		if(libidebarWidth > 0) {
		    				dropdownLeft -= (libidebarWidth + sidebarWidth);
		    			}

		    			if(dropdownTop + dropdownHeight + $parent.offset().top + 10 > scrollY + window.innerHeight){
			    			dropdownTop = scrollY + window.innerHeight - dropdownHeight - $parent.offset().top - 10;
		    			}
		    		}

		    		// 若是不是放在裡面的話則需要計算位置
		    		requestAnimationFrame(function(){
						$dropdown.css({
							'top': dropdownTop,
							'left': dropdownLeft,
							'position': 'absolute'
						});
					});
	    		}	    		
	    	}

			scope.$on("OPEN_DROPDOWN", function(event, data){
				if(data && data.dropdown == attrs.openDropdown && data.target && (element.has(data.target).length > 0 || element[0].isEqualNode(data.target))){
					isFixed = data.position == "fixed" ? true:false;
					element.trigger("click.dropdown");
				}
			});

	    }
	}
}])

.directive('dropdown', function() {
	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {

	    	var isAutoArrow = element.attr('auto-arrow');

	    	// if(isAutoArrow) {
	    	// 	$("<div class='dropdown-arrow'></div>").prependTo(element);
	    	// 	$("<div class='dropdown-arrow-shadow'></div>").prependTo(element);
	    	// }
	    	// 自動隱藏 dropdown內容
	    	var openClass = element.data('openClass');
	    	if(openClass){
	    		element.removeClass(openClass);
	    	}else{
	    		element.hide();
	    	}


	    }
	}
})

.directive('dropdownClose', function ($rootScope) {
  	return {
	    restrict: 'A',
	    link: function(scope, element, attrs) {

	    	element.on('click.dropdown', function(e){
	    		var $dropdown = $('[dropdown]').has(element);
		    	if($dropdown.length == 0){
		    		return;
		    	}

		    	var openClass = $dropdown.data('openClass');
	    	
	    		if(openClass){
		    		$dropdown.removeClass(openClass);
		    	}else{
		    		$dropdown.hide();
		    	}

		    	$('[open-dropdown]').data('dropdownActive', false);
		    	$('[hover-open-dropdown]').data('dropdownActive', false);
		    	$('.dropdown-overlay').remove();
		    	$rootScope.$broadcast("DROPDOWN_CLOSE", attrs.dropdownClose);
	    	});
	    }
	}
})

.factory("$ngDropdown", function ($rootScope) {

	var factory = this;

	factory.hideDropdown = function (id) {
		var $dropdowns = $('[dropdown="' + id + '"]');
		if($dropdowns.length == 0){
			return;
		}

		$dropdowns.each(function(trigger) {
			var openClass = $(this).data('openClass');
			if(openClass){
				$(this).removeClass(openClass);
			}else{
				$(this).hide();
			}
			$('.dropdown-overlay').remove();
		});

		$('[open-dropdown="' + id + '"]').data('dropdownActive', false);
		$('[hover-open-dropdown="' + id + '"]').data('dropdownActive', false);
		$rootScope.$broadcast("DROPDOWN_CLOSE", id);
	};

	factory.hideAllDropdown = function () {
		var $dropdowns = $('[dropdown]');
		if($dropdowns.length == 0){
			return;
		}

		$dropdowns.each(function(trigger) {
			var openClass = $(this).data('openClass');
			if(openClass){
				$(this).removeClass(openClass);
			}else{
				$(this).hide();
			}
			$('.dropdown-overlay').remove();
		});

		$('[open-dropdown]').data('dropdownActive', false);
		$('[hover-open-dropdown]').data('dropdownActive', false);
	};

	return factory;

});