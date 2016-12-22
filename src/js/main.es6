


// 빌드시 아래 주석을 해제한 후 빌드
require('./lib/jquery');
require('./lib/jquery.easing.min');

let angular = require('angular');


// 의존 모듈 로드
require('angular-resource');
require('ladda');
require('angular-ladda');
require('angular-ui-router');


// App 모듈 정의 (의존 모듈 주입)
let popcorn = angular.module('PopcornListApp', [
	'ngResource',
	'angular-ladda',
	'ui.router',
	]).
      filter('trustAsResourceUrl', ['$sce', function($sce) {
     return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
 }]);






// 모듈 환경 설정
popcorn.config([
	'$httpProvider',
	'$resourceProvider',
	'laddaProvider',
	'$stateProvider',
	'$urlRouterProvider',
	($httpProvider,$resourceProvider,laddaProvider,$stateProvider,$urlRouterProvider)=>{

      //$stateProvider
      $stateProvider
     	.state('list',{
			'url': '/',
			'views': {
				'header':{
					'templateUrl': 'views/header.html'
				},
				'mainCarousel': {
					'templateUrl' : 'views/mainCarousel.html',
			   		'controller' : 'carouselController'
				},
				'mainRanking':{
					'templateUrl' : 'views/mainRanking.html',
			   		'controller' : 'rankingController'
				},
				'mainRecommend':{
					'templateUrl' : 'views/mainRecommend.html'
				},
				'mainMagazine': {
					'templateUrl' : 'views/mainMagazine.html'
				}
			}
	})
	.state('edit',{
			'url': '/detail/:id',
			'views':{
			 'header':{
					'templateUrl': 'views/header.html'
			  },
			  'main':{
				'templateUrl' : 'views/movieinfo.html'
			    }
			}
	})
	.state('signin',{
			'url': '/login',
			'views':{
			 'header':{
					'templateUrl': 'views/header-login.html'
			  },
			  'main':{
				'templateUrl' : 'views/login.html',
				'controller' : 'loginController'
			    }
			}
	})
	.state('create',{
		'url': '/signup',
		'views':{
		  'header':{
			'templateUrl': 'views/header-login.html'
	        },
		  'main':{
			'templateUrl' : 'views/signup.html',
			'controller' : 'signupController'
		    }
		}
	})
	.state('search',{
		'url': '/search',
		'views':{
		  'header':{
			'templateUrl': 'views/header-login.html'
	        },
		  'main':{
			'templateUrl' : 'views/search.html'
		    }
		}
	});



      //$urlRouterProvider
      $urlRouterProvider.otherwise('/');

      //ngResource
	let token = 'Token ffa44753118e755c0c28070fcbcc6c9a048b99bf';
	$httpProvider.defaults.headers.common['Authorization'] = token;
	$resourceProvider.defaults.stripTrailingSlashes = false;

	//laddaProvider
	laddaProvider.setOption({
		'style' : 'expend-left'
	})
}]);






// --------------------------------------------------------
// directive
// --------------------------------------------------------
require('./directives/mainCarousel');
require('./directives/mainRecommend');
require('./directives/seachStar');

require('./controllers/main/carouselController');
require('./controllers/main/rankingController');
require('./controllers/main/recommendSelectController');
require('./controllers/main/recommendCountryController');
require('./controllers/main/recommendGradeController');
require('./controllers/main/magazineController');
require('./controllers/main/commentController');


// --------------------------------------------------------
// controllers: 영화 상세
// --------------------------------------------------------
require('./controllers/movieinfoDetail/moviedetailController');
require('./controllers/movieinfoDetail/movieinfoRelatedController');
require('./controllers/movieinfoDetail/movieinfoCommentController');
require('./controllers/movieinfoDetail/movieinfoFamousLineController');
// --------------------------------------------------------
// controllers: sign up
// --------------------------------------------------------
require('./controllers/signup/loginController');
require('./controllers/signup/signupController');
require('./controllers/signup/userinfoController');
// --------------------------------------------------------
// controllers: search
// --------------------------------------------------------
require('./controllers/search/searchController');


// --------------------------------------------------------
//service : main
// --------------------------------------------------------
require('./services/main/carouselDataShareService');
require('./services/main/magazineDataShareService.es6');
require('./services/main/rankingDataShareService');
require('./services/main/commentDataShareService');

//recommend-select (genre, country, grade)
require('./services/main/recommendSelectDataShareService');
require('./services/main/recommendCountryDataShareService');
require('./services/main/recommendGradeDataShareService');


// --------------------------------------------------------
// service: 영화상세
// --------------------------------------------------------
require('./services/movieinfodetail/moviedetailDataShareService');
require('./services/movieinfodetail/movieinfoRelatedDataShareService');
require('./services/movieinfodetail/movieinfoCommentDataShareService');
require('./services/movieinfodetail/movieinfoFamousLineDataShareService');
// --------------------------------------------------------
// service: signup
// --------------------------------------------------------
require('./services/signup/loginDataShareService');
require('./services/signup/signupDataShareService');
require('./services/signup/userinfoDataShareService');
// --------------------------------------------------------
// service: search
// --------------------------------------------------------
require('./services/search/searchDataShareService');



// Filters
require('./filters/readingZeroFilter');
require('./filters/defaultimageFilter');

// main-script
require('./main-script/header-scroll');
require('./main-script/recommend-carousel');
require('./main-script/ranking-hover');
require('./movie-info/movieinfo');
require('./movie-info/showGrade.js');
require('./ratingStars.js');
