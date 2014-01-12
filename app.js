var angular;
var app = angular.module("myApp", []);

app.config(function($provide) {
  $provide.decorator('$parse', function($delegate) {
    return function(expression) {
      //if(angular.isString(expression)) console.log(expression);
      if(/^eval /.test(expression)) {
        var initialParse = $delegate(expression.substr(5));
        return function(context, locals){
          var initialApplication = initialParse(context, locals);
          return $delegate(initialApplication)(context, locals);
        };
      }
      return $delegate(expression);
    };
  });
});

app.factory("schemaData", function($http) {
  return $http.get('formTemplate.json').then(function(res){
    return {
      schema : res.data,
      data : angular.copy(res.data)
    };
  });
});

app.factory("addFunction", function() {
  return function(model, field) {
    if(!angular.isArray(model[field.name])) model[field.name] = [];
    model[field.name].push({});
  };
});
app.factory("removeFunction", function() {
  return function(fields, model) {
    angular.forEach(fields, function(value, idx){
      if(value === model) {
        fields.splice(idx, 1);
        return;
      }
    });
  };
});
app.controller("formA", function($scope, schemaData, addFunction, removeFunction) {
  $scope.add = addFunction;
  $scope.remove = removeFunction;
  schemaData.then(function(v){
    $scope.field = v.schema;
    $scope.model = v.data;
  });
});

app.controller("formB", function($scope, schemaData, addFunction, removeFunction) {
  $scope.add = addFunction;
  $scope.remove = removeFunction;
  schemaData.then(function(v){
    $scope.field = v.data;
    $scope.model = v.schema;
  });
});