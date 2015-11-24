/*
    Directive: aac.progressBar
*/

(function() {
    'use strict';

    angular
        .module('aac.progressBar')
        .directive('progressBar', progressBar);

    /** @ngInject */
    function progressBar() {
        return {
            restrict: 'E',
            scope: {
            	current: '=',
            	max: '@'
            },
            template: `
            	<div 
            		class="progress-bar"
            		style="width: calc({{pb.value.percentage}}% - 56px); opacity: {{pb.value.percentage / 80}}" 
            		ng-class="{
            			'pb-medium': pb.value.percentage > 60,
                        'pb-high': pb.value.percentage > 75,
                        'pb-max': pb.value.percentage > 90,
                    }"></div>
            `,
            replace: true,
            compile: function() {
            	function updateValue( scope ) {
            		scope.pb = {
                		value: {
                			current: scope.current,
                			max: scope.max,
                			percentage: ( (scope.current ? scope.current.length : 0.1) * 100 ) / parseInt(scope.max)
                		}
                	};
            	}

                return {
                    pre: function( scope, element, attrs ) {
                    	scope.$watch('current', function() {
                    		updateValue( scope );
                    	} );

                    	element.parent().addClass('progress-bar-wrapper');
                    },
                    post: function( scope, element ) {
                        
                    }
                };
            }
        };
    }
})();
