
angular.module('myApp.controllers').controller('teacherCtrl',
    ['$rootScope','$scope', '$http', '$window', '$log',
        function ($rootScope, $scope, $http, $window, $log) {
            /////////////////////////////////////////////////////////////
            console.log('Loading `dochody` controller');
            $scope.M = {};
            $scope.wynik = [];
            const URL = "http://basra.wsi.edu.pl:1111";

            $scope.test = {};

            $scope.dane = [
                {pesel: 'AA11', name: 'Koepka', dochod: 413},
                {pesel: 'VA11', name: 'Rose', dochod: 461},
                {pesel: 'VA12', name: 'Johnson', dochod: 362},
                {pesel: 'VX11', name: 'Thomas', dochod: 377}
            ];


            /////////////////////////////////////////////////////////////



            $scope.addQuestion = function () {
                $scope.test.items.push({"from": "", "to": ""});
            };

            $scope.loadTest = function () {
                $http({
                    url: URL + '/tests',
                    method: 'GET',
                    params: {
                        alias: "dd"
                    }
                }).success(function (dane) {
                    $scope.test = dane;
                });
            };


            $scope.saveTest = function() {
                const test = $scope.test;
                $http({
                    url: URL + '/tests',
                    method: 'POST',
                    data: JSON.stringify(test)
                }).success(function(data){
                    console.log('Zapisano test: ' + JSON.stringify(test));
                });

            }


        }
    ]
);
