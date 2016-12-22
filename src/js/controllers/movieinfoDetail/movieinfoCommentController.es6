'use strict';

let angular = require('angular');

angular
  .module('PopcornListApp')
  .controller('movieinfoCommentController',
    ['$scope', 'movieinfoCommentDataShareService', ($scope, movieinfoCommentDataShareService)=>{

      // popcorn 모델 데이터
    $scope.movieinfoComment_data = movieinfoCommentDataShareService;
    // console.log($scope.movieinfoComment_data);
    // 컨트롤러 $scope 객체의 속성
    // $scope.search = '';
    // $scope.order  = 'id';

    // 컨트롤러 $scope 객체의 메소드 // 클릭시 세부정보로 가도록
    $scope.selectMovie =function(movie) {
      $scope.movieinfoComment_data.movieinfoComment_movie = movie;
    
    };

    $scope.create = ()=> {
      $scope.movieinfoComment_data.createContact($scope.movieinfoComment_data.movieinfoComment_movie);
    };
 

  }]);

