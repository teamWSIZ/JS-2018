
angular.module('myApp.controllers').controller('teacherCtrl',
    ['$rootScope','$scope', '$http', '$window', '$log',
        function ($rootScope, $scope, $http, $window, $log) {
            /////////////////////////////////////////////////////////////
            console.log('Loading `dochody` controller');
            $scope.M = {};
            $scope.wynik = [];
            $scope.testAlias = 'dd';
            $scope.tablica = [1, 2, 3, 4, 5];

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

            let randomIndex = function (max) {
                return Math.floor(Math.random() * max);
            };

            $scope.shuffleTable = function (arr) {
                const n = arr.length;
                console.log('before: ' + arr);
                for (let i = 0; i < 100; i++) {
                    const from = randomIndex(n);
                    const to = randomIndex(n);
                    console.log('from:' + from + ' to:' + to);
                    const t = arr[from];
                    arr[from] = arr[to];
                    arr[to] = t;
                }
                console.log('after: ' + arr);
            };

            $scope.deleteQuestion = function (qu) {
                let idx = $scope.test.items.indexOf(qu);
                console.log('Removing question at index:' + idx);
                $scope.test.items.splice(idx,1);
            };

            $scope.loadTest = function () {
                $http({
                    url: URL + '/tests',
                    method: 'GET',
                    params: {
                        alias: $scope.testAlias
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
