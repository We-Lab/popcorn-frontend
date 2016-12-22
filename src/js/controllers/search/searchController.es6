'use strict';

let angular = require('angular');

angular
  .module('PopcornListApp')
  .controller('searchController',
    ['$scope', 'searchDataShareService', ($scope, searchDataShareService,)=>{

      // popcorn 모델 데이터
    $scope.search_data = searchDataShareService;
     console.log($scope.search_data);
    // console.log($stateParams.id); 
    // 컨트롤러 $scope 객체의 속성
    // $scope.search = {};
    $scope.search = '';
    // $scope.order  = 'id';

    // 컨트롤러 $scope 객체의 메소드 // 클릭시 세부정보로 가도록
    $scope.selectMovie=(movie) => {
      $scope.search_data.search_movie = movie;
    };

    $scope.$watch('search', (newValue)=>{
       $scope.search_data.doSearch(newValue);
       console.log(newValue);
    });


  }]);
