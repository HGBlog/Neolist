appControllers.controller('RegisterCtrl', function($scope,$rootScope, $http, $state, $ionicPopup, UserService) {

    $scope.register = {};
    $scope.viewdata = {
        categories: [{
                id: 7,
                name: 'Brigadista'
            },
            {
                id: 6,
                name: 'Enfermeiro(a)'
            },
            {
                id: 5,
                name: 'Médico'
            },
            {
                id: 1,
                name: 'Monitor'
            },
            {
                id: 2,
                name: 'Peregrino(a)'
            },
            {
                id: 3,
                name: 'Responsável de Grupo'
            },
            {
                id: 4,
                name: 'Responsável pela Acolhida'
            }
        ],
        languages: [{
                val: 'ar',
                name: 'Árabe'
            },
            {
                val: 'es',
                name: 'Espanhol'
            },
            {
                val: 'fr',
                name: 'Francês'
            },
            {
                val: 'in',
                name: 'Inglês'
            },
            {
                val: 'it',
                name: 'Italiano'
            },
            {
                val: 'pt',
                name: 'Português'
            },
            {
                val: 'ou',
                name: 'Outros'
            },
        ],
        countries:{}
    }




    $scope.countries = function() {
        $http.get('./js/models/country.json').then(function(response) {
            $scope.viewdata.countries = response.data;
        });
    }

    $scope.countries();

    $scope.registerUser = function(form){
        // UserService.insert($scope.register);
        if (angular.isDefined(form) && !form.$valid) {
            angular.forEach(form.$error.required, function (field) {
                field.$setDirty();
                field.$setTouched();
            });

        }else{
            UserService.insert($scope.register).then(function(response){
                if(response.status == 200){

                   if(response.data == 'user exists'){
                    var alert = $ionicPopup.alert({
                        title: 'Usuário já cadastrado!',
                        template: 'Você já tem cadastro no app'
                    });
                    alert.then(function(res) {
                        login();
                    });
                   }

                   if(response.data == 'ok'){
                    var alert = $ionicPopup.alert({
                        title: 'Sucesso',
                        template: 'Cadastro realizado com sucesso!'
                    });
                    alert.then(function(res) {
                        login();
                    });
                   }

                   if(response.data == 'erro'){
                    var alert = $ionicPopup.alert({
                        title: 'Ops!',
                        template: 'Houve um problema para efetuar o seu cadastro, tente novamente'
                    });
                    
                   }
                }
            });
        }
    }



    


});