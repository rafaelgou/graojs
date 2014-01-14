GraoJS.factory('{{ schema | lower }}', ['$resource', 'config', function($resource, config) {
  var {{ schema | lower }} = $resource(config.baseUrl+'/{{ schema | lower }}/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
  return {{ schema | lower }};
}]);