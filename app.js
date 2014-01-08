var app = angular.module("myApp", []);

app.config(function($provide) {
  $provide.decorator('$parse', function($delegate) {
    return function(expression) {
      //if(angular.isString(expression)) console.log(expression);
      if(/^eval /.test(expression)) {
        var initialParse = $delegate(expression.substr(5));
        return function(context, locals){
          return $delegate(initialParse(context, locals))(context, locals);
        };
      }
      return $delegate(expression);
    };
  });
});


app.factory("schemaA", function() {
    return {
        name : 'fields',
        type : 'repeat',
        fields : [
            {
                name : 'name',
                type : 'text'
            }, {
                name : 'type',
                type : 'select',
                options : [{
                  name :'select'
                }, {
                  name :'text'
                }, {
                  name :'repeat'
                }]
            }, {
                name : 'options',
                type : 'repeat',
                hide : 'model.type != "select"',
                fields : [
                  {
                      name : 'name',
                      type : 'text'
                  }
                ]
            }
        ]
    };
});

app.factory("dataA", function() {
    return {
        name : 'fields',
        type : 'repeat',
        fields : [
            {
                name : 'name',
                type : 'text'
            }, {
                name : 'type',
                type : 'select',
                options : [{
                  name :'select'
                }, {
                  name :'text'
                }, {
                  name :'repeat'
                }]
            }, {
                name : 'options',
                type : 'repeat',
                hide : 'model.type != "select"',
                fields : [
                  {
                      name : 'name',
                      type : 'text'
                  }
                ]
            }
        ]
    };
});
app.factory("addFunction", function() {
  return function(model, field) {
    if(!angular.isArray(model[field.name])) model[field.name] = [];
    model[field.name].push({});
  };
});
app.controller("formA", function($scope, schemaA, dataA, addFunction) {
    $scope.add = addFunction;
    $scope.field = schemaA;
    $scope.model = dataA;
});

app.controller("formB", function($scope, schemaA, dataA, addFunction) {
    $scope.add = addFunction;
    $scope.field = dataA;
    $scope.model = schemaA;
});