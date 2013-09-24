function {GRAO}{LOWER}{BUNDLE_NAME}Control($scope, {GRAO}{LOWER}{BUNDLE_NAME}, share, $log) 
{	
	$scope.share = share;
	$scope.share.notify.content = 'teste';
	
	$scope.createOrUpdate = function() 
	{
		if($scope.{GRAO}{LOWER}{BUNDLE_NAME} != null && $scope.{GRAO}{LOWER}{BUNDLE_NAME}._id != null)
			{GRAO}{LOWER}{BUNDLE_NAME}.update($scope.{GRAO}{LOWER}{BUNDLE_NAME});
		else
			{GRAO}{LOWER}{BUNDLE_NAME}.save($scope.{GRAO}{LOWER}{BUNDLE_NAME});
		
		$scope.reset();
		$scope.query();
	};
	
	$scope.delete = function(index)
	{
		//var id = $scope.items[index]._id;
		$scope.items[index].$delete();
		$scope.items.splice(index, 1);
		$scope.query();
	};
	
	$scope.remove = function()
	{
		//var id = $scope.items[index]._id;
		$scope.{GRAO}{LOWER}{BUNDLE_NAME}.$delete();
		$scope.query();
	};
	
	$scope.query = function()
	{
		$scope.items = {GRAO}{LOWER}{BUNDLE_NAME}.query();		
	};
	
	$scope.select = function(index)
	{
		$scope.{GRAO}{LOWER}{BUNDLE_NAME} = $scope.items[index];		
	};
	
	$scope.reset = function()
	{
		$scope.share.notify.title = 'Teste '+Math.random();
		//$scope.share.notify.isAutoOpen = 123;
		//$log.info($scope.share.notify.isAutoOpen);
		delete $scope.{GRAO}{LOWER}{BUNDLE_NAME};		
	};
};
