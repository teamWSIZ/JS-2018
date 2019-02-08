angular.module('myApp.controllers').controller('teacherCtrl',
    ['$rootScope','$scope', '$http', '$window', '$log',
        function ($rootScope, $scope, $http, $window, $log) {
            /////////////////////////////////////////////////////////////
            $scope.M = {};
            $scope.wynik = [];
            // const URL = "https://guam.wsi.edu.pl:1111";
            const URL = "http://basra.wsi.edu.pl:1111";

            $scope.editedTest = {};   //aktualnie edytowany editedTest
            $scope.selectedAlias = undefined;

            /////////////////////////////////////////////////////////////

            $scope.addQuestion = function () {
                $scope.editedTest.items.push({"from": "", "to": ""});
            };

            $scope.newTest = function () {
                console.log('Tworzę nowy test');
                //nowy test ma pole "items", które jest pustą tablicą
                $scope.editedTest = {"items": []};

                //do nowego testu dodajmy jedno puste pytanie
                //to jest uruchamianie poprzedniej funkcji:

                //prosta pętla: środek będzie powtórzony 3 razy
                for(let i = 0; i<3; i++) {
                    $scope.addQuestion();
                }

            };

            $scope.loadTest = function () {
                $http({
                    url: URL + '/tests',
                    method: 'GET',
                    params: {
                        alias: $scope.selectedAlias
                    }
                }).success(function (dane) {
                    $scope.editedTest = dane;
                });
            };


            //ta funkcja zapisuje podany `editedTest` w systemie backendowym pod adresem `URL`
            $scope.saveTest = function() {
                let testDoZapisania = $scope.editedTest;
                //trzeba dodać pole alias
                testDoZapisania.alias = $scope.selectedAlias;
                $http({
                    url: URL + '/tests',
                    method: 'POST',
                    data: JSON.stringify(testDoZapisania)
                }).success(function(data){
                    console.log('Test zosatał zapisany');
                });
            }


        }
    ]
);
