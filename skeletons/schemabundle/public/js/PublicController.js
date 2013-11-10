function {{ schema | capitalize }}PublicController($scope, {{ schema | lower }}, share, $log) 
{	
	$scope.share = share;
	
	$scope.createOrUpdate = function() 
	{
		if($scope.{{ schema | lower }}._id != null)
			{{ schema | lower }}.update($scope.{{ schema | lower }});
		else
			{{ schema | lower }}.save($scope.{{ schema | lower }});
		
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
		$scope.items = {{ schema | lower }}.query();		
	};
	
	$scope.select = function(index)
	{
		$scope.{{ schema | lower }} = $scope.items[index];		
	};
	
	$scope.reset = function()
	{
		delete $scope.{{ schema | lower }};		
	};
}