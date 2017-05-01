(function() {
  "use strict";

  angular.module("menuApp")
  .directive("arisMenu",
  ['$http', '$window', '$document','$filter','$translate', '$location',
  function($http, $window, $document,$filter,$translate, $location) {
    return {
        scope: {
          templatePath:'@'
        },
          restrict: "E",
        templateUrl: prefix+"core/menu-module/directive/aris-menu.html",
        link: function($scope, $element, $attributes) {
              var onEscClick = function(event){
                if(event.which === 27) { // 27 = esc key
                    $('#aris-menu-uncollapse>li').removeClass('open');
                    $('#aris-menu-collapse').attr('aria-expanded', 'false');
                    $('#aris-menu-collapse').css('height', '0px');
                    $('#aris-menu-collapse').removeClass('in');
                    event.preventDefault();
                }
              };

              $document.on("keydown keypress", onEscClick);
              $element.on('$destroy', function() {
                  $document.off("keydown keypress", onEscClick);
              });
        },
        controllerAs: 'mCtrl',
        controller: ['$location', '$scope', '$http', '$window', function ($location, $scope, $http, $window) {    //NOSONAR
              this.mItems = getMenuItems();
              this.isCollapsed = [];
              for (var i in this.mItems) {
                  this.isCollapsed[i] = true;
              }

              function hideMenu() {
                $('#aris-menu-uncollapse>li').removeClass('open');
                $('#aris-menu-collapse').attr('aria-expanded', 'false');
                $('#aris-menu-collapse').css('height', '0px');
                $('#aris-menu-collapse').removeClass('in');
              };
              /* Event Resize for charts */
              var w = angular.element($window);
              w.bind('resize', function () {
                for (var i in this.mItems) {
                    this.isCollapsed[i] = true;
                };
                hideMenu();
              });

              this.closeMenu = function(){
                for (var i in this.mItems) {
                    this.isCollapsed[i] = true;
                };
                hideMenu();
              }

              this.handleTopMenu = function (mItem, mItemIndex) {
                  // Display the child options or execute the action
                  if (typeof (mItem.subMenuItems) !== "undefined") {
                      this.isCollapsed[mItemIndex] = !this.isCollapsed[mItemIndex];
                  } else {
                    if (mItem.link.indexOf('logout')===0) {
                      LoginService.setLoggedOut();
                      $location.path('/login');
                    } else if (mItem.link.indexOf('http')===0) {
                          var menuOption = mItem.link;
                          window.open(adjustHttpLink(menuOption));
                    } else if (mItem.link.indexOf('close')===0) {
                        for (var i in this.mItems) {
                            this.isCollapsed[i] = true;
                        };
                    } else if (mItem.link!==undefined && mItem.link.indexOf('close')===-1) {
                        $location.path('/' + mItem.link);
                    }
                    hideMenu();
                  }
              };

              //navigate & close nav bar
              this.handleSubMenu = function (subMenuItem) {
                  if (subMenuItem.link.indexOf('http')===0) {
                    var menuOption = subMenuItem.link;
                    window.open(adjustHttpLink(menuOption));
                  } else {
                    $location.path('/' + subMenuItem.link);
                  }
                  for (var i in this.mItems) {
                      this.isCollapsed[i] = true;
                  }
                  hideMenu();
              };

              function adjustHttpLink(menuOption) {
                var hostAdjusted = location.host;
                if (menuOption.toUpperCase().indexOf('CURRENTHOST:')!==-1) {
                  var pos = location.host.indexOf(':');

                  if (pos!==-1) {
                    hostAdjusted = location.host.substring(0,pos);
                  }
                }
                var linkAdjusted = menuOption.replace(/CURRENTHOST/,hostAdjusted);

                return linkAdjusted;
              };

              //Recover the Menu structure
              function getMenuItems() {
                return app.config.menu.menu_config;
              };
            }]
        };
    }]);
})();
