'use strict';

angular.module('starter.services', ['starter.constants', 'firebase', 'ngCordova', 'ngCordovaOauth'])
.factory('User', function($rootScope, $http, nodeUrl, $ionicPopup, $cordovaOauth){
  function User(){
  }

  function showAlert(titleStr, response){
    $ionicPopup.alert({
      title: titleStr,
      content: response
    }).then(function(res) {
      console.log('Test Alert Box');
    });
  }

  User.initialize = function(){
    return $http.post(nodeUrl + '/users');
  };

  User.oauth = function(provider){
    switch(provider){
      case 'facebook':
        console.log('Inside Facebook');
        $cordovaOauth.facebook('442668512567921', ['email']).then(function(result){
          return $rootScope.afAuth.$authWithOAuthToken('facebook', result.access_token);
        }, function(error){
          showAlert('ERROR at the facebook level',  error);
        });
        break;
      case 'google':
        console.log('Inside Google');
        $cordovaOauth.google('534265459229-jpvjvcbk8vmevna8i8iccrvgmb7tcp4o.apps.googleusercontent.com', ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result){
          $rootScope.afAuth.$authWithOAuthToken('google', result.access_token).then(function(authData){
            $scope.modal.hide();
            showAlert('Successfully login', JSON.stringify(authData));
          }, function(error){
            showAlert('ERROR at the firebaseAuth level', error);
          });
        }, function(error){
          showAlert('ERROR at the google plus level', error);
        });
    }
  };

  // User.register = function(user){
  //   return $rootScope.afAuth.$createUser(user);
  // };

  // User.login = function(user){
  //   return $rootScope.afAuth.$authWithPassword(user);
  // };

  User.logout = function(){
    return $rootScope.afAuth.$unauth();
  };

  return User;
});
