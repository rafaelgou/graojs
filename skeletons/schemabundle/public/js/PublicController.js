function {{ name | capitalize }}PublicController($scope, {{ name | lower }}, share, $log) 
{	
	$scope.share = share;
	
	$scope.createOrUpdate = function() 
	{
		if($scope.{{ name | lower }}._id != null)
			{{ name | lower }}.update($scope.{{ name | lower }});
		else
			{{ name | lower }}.save($scope.{{ name | lower }});
		
		$scope.reset();
		$scope.query();
	};
	
	$scope.destroy = function(index)
	{
		//var id = $scope.items[index]._id;
		$scope.items[index].$delete();
		$scope.items.splice(index, 1);
		$scope.query();
	};
	
	$scope.query = function()
	{
		$scope.items = {{ name | lower }}.query();		
	};
	
	$scope.select = function(index)
	{
		$scope.{{ name | lower }} = $scope.items[index];		
	};
	
	$scope.reset = function()
	{
		delete $scope.{{ name | lower }};		
	};
}