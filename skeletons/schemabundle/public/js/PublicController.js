function {{ schema | capitalize }}PublicController($scope, {{ schema | lower }}, $http) {
  $scope.{{ schema | lower }} = {{ schema | lower }};
  $scope.filterData = {};
  $scope.statusData = { totality: 0, filtered: 0, listing: 0 };

{%- for fieldName, field in fields %} 
  {%- if field.ref %}
  $http.get("/{{ field.ref | lower }}")
    .success(function (data, status, headers, config){
      $scope.{{ field.ref | lower }}s = data;
    })
    .error(function (data, status, headers, config){});
  {%- endif %}{%- endfor %} 
  $scope.showWindow = function(windowName) {
    $scope.selectWindow = windowName;
   };

  $scope.createOrUpdate = function() {
    if($scope.{{ schema | lower }}._id != null)
      {{ schema | lower }}.update($scope.{{ schema | lower }});
    else
      {{ schema | lower }}.save($scope.{{ schema | lower }});
  };
  
  $scope.destroyByIndex = function(index) {
    $scope.items[index].$delete();
    $scope.items.splice(index, 1);
  };
  
  $scope.filterNormalize = function() {
    for(var k in $scope.filterData) {
      if($scope.filterData[k] == null || $scope.filterData[k] == "")
        delete $scope.filterData[k];
    }
  }

  $scope.filter = function() {
    $scope.filterNormalize();
    $scope.items = {{ schema | lower }}.query({filter: JSON.stringify($scope.filterData)});
  }

  $scope.query = function() {
    $scope.items = {{ schema | lower }}.query();
  };

  $scope.count = function() {
    $scope.filterNormalize();
    $http.get("/{{ schema | lower }}/count", {params: {filter: JSON.stringify($scope.filterData)}})
      .success(function (responseCount, status, headers, config){
        $scope.statusData.totality = responseCount.totality;
        $scope.statusData.filtered = responseCount.filtered;
        $scope.statusData.listing = $scope.items.length;
      })
      .error(function (data, status, headers, config){});
    delete responseCount;
  };

  $scope.queryMore = function() {
    $scope.filterNormalize();
    var moreItems = {{ schema | lower }}.query({skip: $scope.items.length, filter: JSON.stringify($scope.filterData)}, function(){
      angular.forEach(moreItems, function(item){
        $scope.items.push(item);  
      });
    });
  };
  
  $scope.select = function(index) {
    $scope.{{ schema | lower }} = $scope.items[index];
  };
  
  $scope.clear = function() {
    delete $scope.{{ schema | lower }};
    $scope.{{ schema | lower }} = {};
  };
}