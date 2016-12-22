'use strict';

let angular = require('angular');


angular
  .module('PopcornListApp')
  .factory('Login', ['$resource', function($resource){
    return $resource(
      'https://django-api.com/member/login/',{},
         {'get' : {method: 'get'},
         'create': { method:'post'}
       }
      );
  }])
 
  .service('loginDataShareService', ['Login' , (Login)=>{  
    let initServiceSetting = ()=> {
      _service.people   = [];
      _service.page     = 1;
      _service.has_more = true;
    };
    
     var _service = {
        'login_person' : null,
        'people' : [],
        'is_loading' : false,
        'is_creating' : false,
        'loadContacts' : ( ) =>{

           _service.is_loading = true;
          
        },
        'createContact' : (person,gotoListPage) => {
           
            let login = new Login(person);

            _service.is_creating = true;


            login.$create().then(()=> {
                window.localStorage.clear();

                window.localStorage['key'] = login.key;
                // console.log( window.localStorage['key']);
                // initServiceSetting();
                _service.loadContacts();
                _service.is_creating = false;
                gotoListPage();
            });
        },

     };

   
    // _service.loadContacts();
     return _service;
  }]);