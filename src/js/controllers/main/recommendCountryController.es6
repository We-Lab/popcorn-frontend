let angular = require('angular');

angular
  .module('PopcornListApp')
  .controller('recommendCountryController',
    ['$scope', 'recommendCountryDataShareService', ($scope, recommendCountryDataShareService)=>{

      // popcorn 모델 데이터
    $scope.recommendCountry_data = recommendCountryDataShareService;
    // console.log($scope.recommendCountry_data);
    // 컨트롤러 $scope 객체의 속성
    // $scope.search = {};
    $scope.search = '';
    $scope.order  = 'id';

    //컨트롤러 $scope 객체의 메소드 // 클릭시 세부정보로 가도록
    $scope.selectMovie =function(movie) {
      $scope.recommendCountry_data.recommendCountries_movie = movie;
    };
 

  }]);