
'use strict';

let angular = require('angular');


angular
  .module('PopcornListApp')
  .factory('movieinfoComment', ['$resource','$stateParams', function($resource,$stateParams){
    return $resource(
      'https://django-api.com/movie/:id/comment/',{id: $stateParams.id},
      { 'get' : {
            method: 'GET'
          },
        'create': { 
             method:'post',
             headers: {'Authorization' : 'Token 6c7259f9067338c4e86bbd146ca2082aeb1454be'}
           }
        }
      );
  }])
//'Token '+window.localStorage['key']
   .service('movieinfoCommentDataShareService', ['movieinfoComment' , (movieinfoComment)=>{  

    let initServiceSetting = ()=> {
      _service.people   = [];
      _service.page     = 1;
      _service.has_more = true;
    };

     var _service = {
        'movieinfoComment_movie' : null,
        'movies' : [],
       // 'has_more' : true, // 다음 페이지가 있으면 true
        'is_loading' : false,
        'loadContacts' : ( ) =>{
           movieinfoComment.get((data)  =>{
             angular.forEach(data.results, (movie) => {
                    _service.movies.push(new movieinfoComment(movie));
             });
        });
        },
      'createContact' : (movie) => {
           
            _service.is_creating = true;

            (new movieinfoComment(movie)).$create().then(()=> {
                initServiceSetting();
                _service.loadContacts();
                _service.is_creating = false;
            });
        }
     };
   
    _service.loadContacts();

     return _service;
  }]);