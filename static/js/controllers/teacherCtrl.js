angular.module('myApp.controllers').controller('teacherCtrl',
    ['$rootScope','$scope', '$http', '$window', '$log',
        function ($rootScope, $scope, $http, $window, $log) {
            /////////////////////////////////////////////////////////////
            console.log('Loading `dochody` controller');
            $scope.M = {};
            $scope.wynik = [];
            // const URL = "https://guam.wsi.edu.pl:1111";
            const URL = "http://basra.wsi.edu.pl:1111";

            $scope.editedTest = {};   //aktualnie edytowany editedTest
            $scope.testAlias = '';
            $scope.editAlias = false;
            $scope.selectAlias = undefined;


            /////////////////////////////////////////////////////////////
            //operacje zapisu/odczytu na testach

            $scope.newTest = function () {
                $scope.editedTest = { 'items': []};
                $scope.testAlias = '(nowy)';
            };

            //dodaje nowe pytanie na koniec testu
            $scope.addQuestion = function () {
                $scope.editedTest.items.push({"from": "", "to": ""});
            };

            //wczytuje editedTest o zadanym aliasie z systemu backendowego pod adresem `URL`
            $scope.loadTest = function (aliasOfTest) {
                $http({
                    url: URL + '/tests',
                    method: 'GET',
                    params: {
                        alias: aliasOfTest
                    }
                }).success(function (dane) {
                    $scope.editedTest = dane;
                });
            };

            //zapisuje podany `editedTest` w systemie backendowym pod adresem `URL`
            $scope.saveTest = function (testDoZapisania) {
                $http({
                    url: URL + '/tests',
                    method: 'POST',
                    data: JSON.stringify(testDoZapisania)
                }).success(function (data) {
                    console.log('Test zosatał zapisany');
                });
            };




        }
    ]
);
