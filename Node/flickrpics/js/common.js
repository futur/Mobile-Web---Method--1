
var myApp = angular.module('Flickr', ['ngResource', 'ngCookies']);

function FlickrCtrl($scope, $resource, $cookieStore) {

	//dynamically populates the tag strings at the top of the page
	$scope.sections = [
        {name: 'art'},
        {name: 'creativity'},
        {name: 'nature'},
		{name: 'world'}];

	$scope.isSelected = function(section) {
        return $scope.tags === section;
    }

	//prepare the resource for flickr api
	$scope.flickr = $resource('http://api.flickr.com/services/feeds/:action',
    {action:'photos_public.gne', format: 'json', jsoncallback : 'JSON_CALLBACK'},
    {get: {method: 'JSONP', params: { 'extras': 'url_z' } }});		

	// click event handler for tag strings
    $scope.doSearch = function ( section ) {
		$scope.tags = section;
        $scope.flickrResult = $scope.flickr.get({ tags:$scope.tags.name });
    };

	//load the page with some default pics
	$scope.flickrResult = $scope.flickr.get({tags: "norway"});
	$cookieStore.put('device', '');
	
	//set innerwidth, innerheight cookie values on window resize
	$scope.getWidth = function() {
        return $(window).width();
    };
	$scope.getHeight = function() {
        return $(window).height();
    };
    $scope.$watch($scope.getWidth, function(newValue, oldValue) {        
		$cookieStore.put('iWidth', newValue);
    });
	$scope.$watch($scope.getHeight, function(newValue, oldValue) {
		$cookieStore.put('iHeight', newValue);
    });
    window.onresize = function(){
        $scope.$apply();
    }	
}

