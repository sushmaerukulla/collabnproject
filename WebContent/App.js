var app=angular.module("App",["ngRoute"]);
app.controller("HomeController",function($scope)
		{
	$scope.test="athomecontroller";
});
app.controller("BlogController",function($scope,$http)
		{
	
	

	$scope.postBlog = function (t, desc, wby,d_blog,brf) {

	var blogData = {

	        title: t,

	        description: desc,

	        writtenby: wby,
	        
	        date_blog:d_blog,
	        
	        brief:brf
	        

	};

	$http.post('http://localhost:8080/mavenwebpro2/createblog',
	        JSON.stringify(blogData)).then(function (response) {

	if (response.data)

	$scope.msg = "Blog  Created Successfully!";

	},
	function (response) {

	$scope.msg = "Service not Exists";

	$scope.statusval = response.status;

	$scope.statustext = response.statusText;

	$scope.headers = response.headers();

	}); //then

	}; //postblog

	$http.get('http://localhost:8080/mavenwebpro2/getallblog').success(function(response)
			{$scope.status=response.statustext;
			$scope.getallblog=response.Bloglist;
			$scope.st=response.status;
					});
	$scope.test="atblogcontroller";
		}); //controller


app.config(function($routeProvider)
		{
	$routeProvider
	.when("/",
	{
			templateUrl:'Home/home.html',
			controller:'HomeController'
	})
			.when("/home",{
				templateUrl: 'Home/home.html',
				controller:'HomeController'
			
			})
			.when("/blog",{
				templateUrl: 'Blogs/blog.html',
					controller:'BlogController'
			}).otherwise({
			       redirectTo:'/'
			   })
		});