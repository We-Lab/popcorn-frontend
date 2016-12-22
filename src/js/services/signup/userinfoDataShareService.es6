'use strict';

let angular = require('angular');


angular
  .module('PopcornListApp')
  .factory('userinfo', ['$resource', function($resource){

    return $resource(
      'https://django-api.com/member/my-info/',{},
      { 'get' : {
                   'method': 'get', 
                   'headers': {'Authorization' : 'Token '+window.localStorage['key'] }
                   }
       }
       );
  }])

  .service('userinfoDataShareService', ['userinfo' , (userinfo)=>{  
     var _service = {
        'userinfo_person' : null,
        'people' : [],
        'is_loading' : false,
        'loadContacts' : ( ) =>{
           userinfo.get((data)  =>{
           
                    // _service.people.push(new userinfo(data));
                    // _service.userinfo(data);z
            _service.people.push(new userinfo(data));
            // angular.forEach(data, (movie)=>{
            //   _service.movies.push( new userinfo(movie));
            // });
             });
        }
     };

   
    _service.loadContacts();
     return _service;
  }]);