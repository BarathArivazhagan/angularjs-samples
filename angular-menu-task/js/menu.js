(function(){

  var menuApp=angular.module("menuApp",[]);

  menuApp.controller("menuController",function($scope){

    $scope.displayMenu=false;
    $scope.menuItems=[];
    $scope.addMenu=function(){
        console.log("adding the menu ");
        $scope.menuItems.push(
          {
            "name":$scope.menuName,
            "class" : $scope.menuClass
          }
        )
    };

    $scope.showMenu=function(){
      console.log("show menu is called");
          $scope.displayMenu=!$scope.displayMenu;
    };
  });



})();
