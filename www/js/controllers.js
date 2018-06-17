var App = angular.module('app.controllers', []);  

App.controller('homeCtrl', function($scope,$state,$rootScope,WebService,$timeout,$ionicLoading,$ionicModal,$ionicSlideBoxDelegate){

   
    var link = 'get_my_key';
    post_data ={'my_key': my_key};
   // var key = 'my_key';
   //  WebService.show_loading();
    var promise = WebService.send_data(link,post_data);
    promise.then(function(data){
         // console.log(data);
      if(data.status == 'failure')
       {
        
         $state.go('sidemenu.blocked');
         //console.log('bmd-blocked');
       }
          // $ionicLoading.hide();
    });

    if(localStorage.getItem('userData') != null){
      $rootScope.checkLogin = true;    

      $rootScope.userData = JSON.parse(localStorage.getItem('userData'));
      $rootScope.id = $rootScope.userData.id;
      $rootScope.user_image = $rootScope.userData.image;
      
    }
    else{
      $rootScope.checkLogin = false; 
    }


    $scope.myFunction = function(path){    
     return site_url + path;
    }
     

    $rootScope.checkstate = 'home';
//console.log($rootScope.checkstate);
/*********************latest film selection************************************/  
    $scope.latest = function(){
      //alert('hi');
        var post_data = {'city':$rootScope.locationid};
        var link = "latest_films";
        WebService.show_loading();
        var promise = WebService.send_data( link,post_data);
        promise.then(function(data){

           $scope.latestfilms = data.result;
           // console.log($scope.latestfilms);
            $ionicSlideBoxDelegate.$getByHandle('image-viewer').update();
           $ionicLoading.hide();
    });
  }

  $timeout(function() {$ionicSlideBoxDelegate.$getByHandle('image-viewer').update();}, 500);

$scope.slideHasChanged = function(index) {
        $scope.slideIndex = index;
        if (($ionicSlideBoxDelegate.$getByHandle('image-viewer').count() - 1) == index) {
            $timeout(function() {
                $ionicSlideBoxDelegate.$getByHandle('image-viewer').slide(0);
            }, $scope.interval);
        }
    };
  
   $rootScope.logout = function(){      
      localStorage.removeItem('userData');
      delete $rootScope.checkLogin;
   }

  /********************* end of latest film selection************************************/  

  $scope.movie_details = function(path){
//console.log(path);
      $rootScope.latest_movie_id = path;
  }


})
   
   
.controller('moviesCtrl', function($scope,$rootScope,WebService,$ionicLoading,$ionicModal,$state) {
  $scope.nowshowing = true;
  $scope.commingsoon = false;
  $scope.nowshowing = 'nowshowing';

  $scope.show_tab = function(tab) {
    if(tab == 'nowshowing'){
       $scope.nowshowing = true;
       $scope.commingsoon = false;
       $scope.nowshowing = 'nowshowing';
    }
    else if(tab == 'commingsoon'){

       $scope.nowshowing = false;
       $scope.commingsoon = true;
       $scope.commingsoon = 'commingsoon';
    }
  }
  $scope.book_film = function(id){
    $rootScope.latest_movie_id = id;
   // alert($rootScope.latest_movie_id);
    $state.go('sidemenu.pickvenue');

  }

  
/*******************now showing films**************************************/
  $scope.movies = function(){
     var post_data = {'location_id':$rootScope.locationid};
     var link = "trailers";
     WebService.show_loading();
     var promise = WebService.send_data( link,post_data);
     promise.then(function(data){
      //console.log(data);
           $scope.trailers = data.result;
           $ionicLoading.hide();
           $rootScope.movie_count = data.result.length;
           if($rootScope.movie_count >0)
           {
            $rootScope.movie_count = true;
           }
           else{
            $rootScope.movie_count = false;
           }      
    // console.log($scope.trailers);
         
     });
   }
  /*******************end of now showing films**************************************/

   $scope.myFunction = function(path){    
     return site_url + path;
   }
 
 /*******************comming films**************************************/
   $scope.comngsoon = function(){
   // alert('hi');
      var post_data = '';
      var link = "comingMovies";
      WebService.show_loading();
      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
          $ionicLoading.hide();
         $scope.commngfilms = data.result;
          $rootScope.commng_movie_count = data.result.length;
        // console.log($rootScope.commng_movie_count);
           if($rootScope.commng_movie_count >0)
           {
            $rootScope.commng_movie_count = true;
           }
           else{
            $rootScope.commng_movie_count = false;
           }      

         
      });
   }

 /*******************end of comming films**************************************/

  $scope.getmoviedetails = function(id){
      $rootScope.imgid = id;
   }


})


App.controller('signinCtrl', function($rootScope,$ionicHistory,$scope,WebService,$state,$timeout,$ionicLoading) {
    $scope.signin = {};
    $scope.sign_in_error = false;
 
    $scope.dosignin = function(sign_in){
      if(sign_in.$valid){
          var post_data = $scope.signin;
          var link = "signin";

          WebService.show_loading();
          var promise = WebService.send_data( link,post_data);
          promise.then(function(data){
             $ionicLoading.hide();
               if(data.status == 'failed'){
                 //console.log(data);
                  $scope.sign_in_error = true;
                  $scope.sign_in_error_msg = data.message;

                }
                else if(data.status == 'success')
                {
                  $rootScope.checkLogin = true;
                  $scope.sign_in_error = true;
                  $scope.sign_in_error_msg = data.message;
                  $timeout(function(){
                    $scope.sign_in_error = false;
                    // $state.go('sidemenu.home');
                  },1000);
                 
                  var user_data = {
                                  'id':data.result.id,
                                  'first_name':data.result.first_name,
                                  'last_name':data.result.last_name,
                                  'email':data.result.email,
                                  'password':data.result.password,
                                  'image':data.result.image!=''?site_url+data.result.image:"img/profile.png"
                  };
                  $rootScope.id = data.result.id;
                  $rootScope.name = data.result.first_name;
                  $rootScope.user_image = data.result.image;
                  localStorage.setItem('userData', JSON.stringify(user_data)); 
                  $rootScope.userData = JSON.parse(localStorage.getItem('userData'));
                  //$rootScope.id = $rootScope.userData.id;
                  $rootScope.user_image = $rootScope.userData.image;
                //  alert($rootScope.user_image);
                  if($rootScope.checkstate =='home'){
                     $ionicHistory.nextViewOptions({
                     disableBack: true
                    });
                      $state.go('sidemenu.home');
                  }
                  else{
                       $rootScope.payment_process();
                  }
               }
        });
      }
    }
})


   
App.controller('forgotCtrl', function($scope,WebService,$state,$timeout,$ionicLoading) {
   $scope.forget = {};
   $scope.forgotpasword_error = false;

  /*******************forgot password**************************************/
 
   $scope.forgot = function(forgotpasword){
   // console.log($scope.forget);
     if(forgotpasword.$valid){
          var post_data = $scope.forget;
          var link = "forgot";
          
          WebService.show_loading();
          var promise = WebService.send_data( link,post_data);
          promise.then(function(data){
           // console.log(data);
              if(data.status == 'failed'){
               // console.log(data);
                $scope.forgotpasword_error = true;
                $scope.forgotpasword_error_msg = data.message;
              }
              else if(data.status == 'success')
              {
                $scope.forgotpasword_error = true;
                $scope.forgotpasword_error_msg = data.message;
               // $state.go('sidemenu.signin');
              }
              $timeout(function(){
                 $scope.sign_in_error = false;
                 $state.go('sidemenu.signin');
              },1800);
              $ionicLoading.hide();
         });
      }
    }

  /*******************end forgot password**************************************/

})


   
App.controller('signupCtrl', function($scope,WebService,$state,$timeout,$ionicLoading) {
  $scope.signup = {};
  $scope.sign_up_error = false;
  $scope.dosignup = function(sign_up){
    //console.log($scope.signup);
    if(sign_up.$valid){
        var post_data = $scope.signup;
        var link = "signup";
        WebService.show_loading();
        var promise = WebService.send_data( link,post_data);
        promise.then(function(data){
            console.log(data);
            if(data.status == 'failure'){
              //console.log(data);
              $scope.sign_up_error = true;
              $scope.sign_up_error_msg = data.message;
            }
            else if(data.status == 'success')
            {
              $scope.sign_up_error = true;
              $scope.sign_up_error_msg = data.message;
              //$state.go('sidemenu.signin');
              //$scope.signup='';
               //sign_up.first_name='';
                sign_up.$setPristine();
            }
                     $timeout(function(){
              $scope.sign_in_error = false;
              $state.go('sidemenu.signin');
            },1500);
            $ionicLoading.hide();
        });
    }
  }
 // $scope.signup='';

})


   
App.controller('trailerCtrl', function($scope,$filter, $ionicHistory,WebService,$ionicLoading,$state,$ionicModal,$rootScope,$sce) {
    $scope.trailers = {};


  /*******************trailer details**************************************/

    $scope.trailer = function(){
        //alert('hi');
        var post_data = {'location_id':$rootScope.locationid};
        var link = "trailers";
        WebService.show_loading();
        var promise = WebService.send_data( link,post_data);
        promise.then(function(data){
          $ionicLoading.hide();
            $scope.trailers = data.result;
            $scope.trailer_count_now = data.result.length;
            if($scope.trailer_count_now >0)
            {              
              $rootScope.trailer_count_now = true;
            }
            else{
              $rootScope.trailer_count_now = false;
            }      
            
        });
    }



    $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
  }
 
  /*******************end of trailer details**************************************/
    $scope.close = function(){
         $ionicHistory.nextViewOptions({
           disableBack: true
        });
        $state.go('sidemenu.home');
    }
    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });
    $ionicModal.fromTemplateUrl('templates/modal2.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
    $scope.modal2 = modal;
    });
 
    $scope.openModal = function() {
        $scope.modal.show();
    };
 
    $scope.closeModal = function() {
        $scope.modal.hide();
    };


    $scope.video = function($index){
       // console.log($index);
        $scope.path = $scope.trailers[$index].path;
        $scope.img = $scope.trailers[$index].image;
        $scope.movie = $scope.trailers[$index].movie_name;
        //console.log($video);
        $scope.modal.show();
    }
 
    $scope.myFunction = function(path){
        return site_url + path;
    }

/****************************comming trailers************************************/
    $scope.comngtrailers = {};
    $scope.comngsoon = function(){
        var post_data = '';
        var link = "commngsoon";
        WebService.show_loading();
        var promise = WebService.send_data( link,post_data);
        promise.then(function(data){
           $scope.comngtrailers = data.result;
           $scope.trailer_count = data.result.length;
            if($scope.trailer_count >0)
           {
            $rootScope.trailer_count = true;
           }
           else{
            $rootScope.trailer_count = false;
           }      
            
            $ionicLoading.hide();
        });
    }

    /****************************end of comming trailers************************************/
})


.controller('moreCtrl', function($scope,$rootScope,WebService,$ionicLoading,$ionicModal,$state) {
    $scope.details = true;
    $scope.summary = false;
    $scope.details = 'details';

    $scope.show_tab = function(tab) {
      if(tab == 'details'){
         $scope.details = true;
         $scope.review  = false;
         $scope.gallery = false;
         $scope.details = 'details';
      }

      else if(tab == 'review'){

         $scope.details = false;
         $scope.gallery = false;
         $scope.review  = true;
         $scope.review  = 'review';
      }
      else if(tab == 'gallery'){

         $scope.details = false;
         $scope.review  = false;
         $scope.gallery = true;
         $scope.gallery = 'gallery';
      }
   }
   $scope.moviedetails = {};
   $scope.comments = {};
   $scope.images = {};

/***********************get movie details*********************************************/
   $scope.movieesdetails = function(){
       var post_data = $rootScope.imgid;
       var link = "getmoviedetails";
       WebService.show_loading();
       var promise = WebService.send_data( link,post_data);
       promise.then(function(data){
             // console.log(data);
           $scope.moviedetails = data.result;
           $rootScope.img = data.result.image;
           $scope.comments = data.result.comments;
           $scope.images = data.result.pics;         
            $ionicLoading.hide();  
       });
      
    }

    $scope.booking_film=function(id){
      $rootScope.latest_movie_id=id;
      $state.go('sidemenu.pickvenue');
    }

  /***********************end of get movie details*********************************************/

   $scope.myFunction1 = function(path){
       // console.log(path);
      return site_url + path;
   }
})

.controller('myaccountsCtrl', function($scope) {


})
 
.controller('dealsCtrl', function($scope,$ionicSlideBoxDelegate,$timeout) {
  $timeout(function() {$ionicSlideBoxDelegate.$getByHandle('image').update();}, 500);

$scope.slideHasChanged = function(index) {
        $scope.slideIndex = index;
        if (($ionicSlideBoxDelegate.$getByHandle('image').count() - 1) == index) {
            $timeout(function() {
                $ionicSlideBoxDelegate.$getByHandle('image').slide(0);
            }, $scope.interval);
        }
    };

})
   
.controller('giftcardsCtrl', function($scope,$ionicSlideBoxDelegate,$timeout) {
  $timeout(function() {$ionicSlideBoxDelegate.$getByHandle('image').update();}, 500);

$scope.slideHasChanged = function(index) {
        $scope.slideIndex = index;
        if (($ionicSlideBoxDelegate.$getByHandle('image').count() - 1) == index) {
            $timeout(function() {
                $ionicSlideBoxDelegate.$getByHandle('image').slide(0);
            }, $scope.interval);
        }
    };

})
   
.controller('trendingsCtrl', function($scope,$rootScope,WebService,$ionicLoading,$state) {
	$scope.nowshowing = true;
  $scope.commingsoon = false;
  $scope.nowshowing = 'nowshowing';
 
  $scope.show_tab = function(tab) {
    if(tab == 'nowshowing'){
       $scope.nowshowing = true;
       $scope.commingsoon = false;
       $scope.nowshowing = 'nowshowing';
    }
    else if(tab == 'commingsoon'){
       $scope.nowshowing = false;
       $scope.commingsoon = true;
       $scope.commingsoon = 'commingsoon';
    }
  }
  $scope.trends = {};
$scope.toptrendings = function(){
          //alert('hi');
          var post_data = '';
          var link = 'toptrendings';
          var promise = WebService.send_data( link,post_data);
          promise.then(function(data){
           // console.log(data);
            $scope.trends = data;
          
            $ionicLoading.hide();
      });
  }
  $scope.myFunction = function(path){
        return site_url + path;
    }

   $scope.book_trendfilm = function(id){
    $rootScope.latest_movie_id = id;
  /*//  alert($rootScope.latest_movie_id);
    $state.go('sidemenu.pickvenue');*/

  }

})
   
.controller('mywalletCtrl', function($scope) {
	/*collpase-in-mywallet*/
 
	$scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
    $scope.shownGroup = null;
    } else {
    $scope.shownGroup = group;
    }
	};

	$scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
	};

})


   
App.controller('bookinghistoryCtrl', function($scope,$rootScope,WebService,$ionicLoading,$timeout) {
   $scope.datas = {};

/***********************details of booked films*********************************************/


  $scope.bookinghstry = function(){
      var post_data = $rootScope.id;
      console.log(post_data);
      var link = "booking_history";
      WebService.show_loading();
      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
          // console.log(data);
          $scope.datas = data.result;
           $ionicLoading.hide();
          $rootScope.book_films = data.result.length;
          if($scope.book_films >0)
           {
            $rootScope.book_films = true;
           }
           else{
            $rootScope.book_films = false;
           }    
          //console.log($scope.datas);
         
      });
 
  }

/***********************end of details of booked films*********************************************/
})


   
.controller('quickpayCtrl', function($scope) {

})


   
App.controller('settingsCtrl', function($scope,$rootScope,WebService,$ionicLoading,$timeout) {
	/*collpase-in-settings*/
/***********************Profile editing*********************************************/
   $scope.edit_pro = function(){

      var post_data = $rootScope.id;
      var link = "editprofile";
      WebService.show_loading();

      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
       // console.log(data);
           $rootScope.details = data.result;
           $date = data.result.date_of_birth;
           $dob = $date.split("-")
           $rootScope.details.year = $dob[0];
           $rootScope.details.month = $dob[1];
           $rootScope.details.day = $dob[2];
          $ionicLoading.hide();
      });

       /***********************end of profile editing*********************************************/
   }
 
   $scope.gender=function(male)
   {
      $rootScope.GenderSelected = $scope.details.gender ;
      // console.log( $scope.GenderSelected);
   }

   $scope.married = function(yes){
      $rootScope.married = $scope.details.married_status;
     //console.log( $rootScope.married);
   }

 /***********************updating data*********************************************/

   $scope.doupdate = function(updateform){
        $scope.updateform_error = false;
        if(updateform.$valid){
            $day = $scope.details.day;
            $month = $scope.details.month;
            $year = $scope.details.year;
            $dob = $year+ '-' + $month + '-' +$day ;
            var post_data = {
                              'id': $rootScope.id,
                              'first_name':$scope.details.first_name,
                              'last_name':$scope.details.last_name,
                              'email':$scope.details.email,
                              'date_of_birth':$dob,
                              'phone':$scope.details.phone,
                              'gender':$rootScope.GenderSelected,
                              'married_status':$rootScope.married 
            };
           // console.log(post_data);
           var link ="updatedata";
           WebService.show_loading();
           var promise = WebService.send_data( link,post_data);
           promise.then(function(data){
              // console.log(data);
               if(data.status == 'failed'){
              //  console.log(data);
                $scope.updateform_error = true;
                $scope.updateform_error_msg = data.message;
              }
              else if(data.status == 'success')
              {
                $scope.updateform_error = true;
                $scope.updateform_error_msg = data.message;
               // $state.go('sidemenu.signin');
              }
              $timeout(function(){
                $scope.updateform_error = false;
              },2000);
              $ionicLoading.hide();
           });
        }
    }
 /***********************end of updating data*********************************************/
  
 /***********************password confirmation********************************************/
  $scope.confirmed = {};
   $scope.confirm_error = false;
  $scope.confirmpassword = function(confirm){
     if(confirm.$valid)
        {
           // console.log($scope.confirmed);
           var post_data = { 'id':$rootScope.id,
                             'curntpaswrd':$scope.confirmed.curntpaswrd,
                             'newpaswrd':$scope.confirmed.newpaswrd,
                             'password':$scope.confirmed.password
           };
          var link = "confirmpassword";
          WebService.show_loading
          var promise = WebService.send_data( link,post_data);
          promise.then(function(data){
            console.log(data);
           // if(data.status == 'failed'){
            //  console.log(data);
              $scope.confirm_error = true;
              $scope.confirm_error_msg = data.message;
           // }
           /* else if(data.status == 'success')
            {
              $scope.confirm_error = true;
              $scope.confirm_error_msg = data.message;
             // $state.go('sidemenu.signin');
            }*/
                     $timeout(function(){
              $scope.confirm_error = false;
            },5000);
            $ionicLoading.hide();
         });
       }
  }

 /*********************** end of password confirmation***********************/

	$scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
        $scope.shownGroup = null;
    } 
    else {
        $scope.shownGroup = group;
    }
	};

	$scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
	};

})


   
.controller('pickvenueCtrl', function($scope,WebService,$ionicLoading,$filter,$rootScope,$ionicModal,$state) {

  /***********************get dates*********************************************/
    $scope.getdate = function(){
      $scope.prefered_time = '';
      $scope.selected_price = '';
      var post_data = '';
      var link = 'getdate';
      WebService.show_loading();
      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
          //console.log(data);
          $rootScope.currnt_date = data.result.current;
          $scope.next_date = data.result.next_Date;
          $scope.tomorow_date = data.result.tomorrow;
          var dd1 = $scope.currnt_date.split('-');
          $rootScope.day = dd1[2];
            //console.log($scope.day );
          var dd1 = $scope.next_date.split('-');
          $scope.nday = dd1[2];
           //   console.log($scope.nday );
          var dd1 = $scope.tomorow_date.split('-');
          $scope.nday1 = dd1[2];
         // console.log($scope.nday1 );
          $ionicLoading.hide();
      });

    }


/***********************end of get dates*********************************************/


/***********************get film date,time,shows of theatre**************************/

    $scope.latest_details = function(){
     //console.log($rootScope.latest_movie_id);
     //alert($rootScope.latest_movie_id);
        var post_data = {'id':$rootScope.latest_movie_id,'currnt_date':'','location_id':$rootScope.locationid};
        var link = 'theatre';
        WebService.show_loading();
        var promise = WebService.send_data( link,post_data);
        promise.then(function(data){
       // console.log(data);
           $scope.theaterdetails = data.result;
           $scope.now_film_details = data.film_info;
           $scope.showtime = data.show_time;
          // console.log($scope.showtime);
           $scope.pricerange = data.price_range;
           $scope.count = data.result.length;
           if($scope.count >0)
           {
            $rootScope.count = true;
           }
           else{
            $rootScope.count = false;
           }      
           //console.log($scope.theaterdetails);
           //console.log(data);
           $ionicLoading.hide();
        });
    }

/***********************end of get film date,time,shows of theatre******************/

   $scope.me_clicked = function(time_val){
      $scope.prefered_time = time_val;
   }
   $scope.getprice = function(price){
      $scope.selected_price = price;
      //console.log($scope.selected_price)
   }

/******************** Pick date Movie************************/

   $scope.call_theatre = function(latest_movie_id,date){
   // alert('hi');
      var post_data = {'id':latest_movie_id,'currnt_date':date,'time':$scope.showtime,'location_id':$rootScope.locationid};
      var link = 'theatre';
      WebService.show_loading();
      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
      
          $scope.theaterdetails = data.result;
          $scope.now_film_details = data.film_info;
          $scope.count = data.result.length;
          if($scope.count > 0)
          {
            $rootScope.count = true;
          }
          else{
            $rootScope.count = false;
          }      
          $ionicLoading.hide();
    });
  }
/********************End Pick date Movie************************/



/********************time select for book seat************************/
  $scope.select_date = function(id){
     $rootScope.show_id = id;
     $state.go('sidemenu.showtime');
  }
/********************End select time for book seat************************/

/******************** Filter Movie************************/


  $scope.call_Theaterdata = function(latest_movie_id,date){
      var post_data = {'id':latest_movie_id,'currnt_date':date,'time':$scope.prefered_time,'price':$scope.selected_price};
      var link = "callTheater";
      $scope.modal3.hide();
      WebService.show_loading();
      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
          $scope.theaterdetails = data.result;
         // console.log($scope.theaterdetails);
          $ionicLoading.hide();
      });
  }

/*******************End of Filter Movie*************************/

  $scope.myFunction1 = function(path){
     return site_url + path;
  }
  
  $ionicModal.fromTemplateUrl('templates/modal3.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal3 = modal;
  });
 
  $scope.openModal = function() {
    $scope.modal.show();
  };
 
  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.filter=function(){

   alert('hi');
    $scope.prefered_time={};
     $scope.selected_price='';
     $scope.prefered_time = false;
     alert($scope.prefered_time)
     
  }

})
   
.controller('showtimeCtrl', function($scope,$rootScope,WebService,$ionicLoading,$state) {

  /*************************seat film and time booking details*********************/
   $scope.seatarray = {};
   $scope.book_seat = function(){
      var post_data = $rootScope.show_id;
     //console.log(post_data);
      var link = "showTheaterInfo";
      $scope.seats = [];   
      WebService.show_loading();
      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
          $scope.showtimedetails = data.result;
          $scope.bookedseats = data.booked;
         // console.log($scope.bookedseats);
          $rootScope.film_name = data.result.movie_name;
          $rootScope.screen = data.result.screen_name;
          $scope.seatarray = JSON.parse(data.result.preview);
          console.log( $scope.seatarray);
          $ionicLoading.hide();
      });
    }
    /*************************changing booked seat color*******************/
    $scope.get_seat_state=function(seat_name){
      //console.log($scope.bookedseats);
     // console.log(seat_name);
      
       var index = getIndexIfObj($scope.bookedseats,seat_name);
       if(index == -1){  
           return 'seat_color_booking';
       } 
       else {
           return 'seat_color_booked';;
       } 
   
    }
    /*************************end of changing booked seat color*******************/


  /*************************end of seat film and time booking details********************/
   $scope.seat_header = function(header,type){
      if(type == 'seat'){
         return header.split('-')[0];
      } 
      else {
         return header.split('-')[1];
      }   
   }

   $scope.selectSeat = function(seat_id,seat_name,price){
      $scope.price = 0;
      var seat_array = {'seat_id':seat_id,'seat_name':seat_name,'price':price};

      var index_new = getIndexIfObj($scope.bookedseats,seat_name);
      if(index_new == -1){

      var index = getIndexIfObjWithAttr($scope.seats,"seat_name",seat_name);

      if(index == -1){
        $scope.seats.push(seat_array);
        $('.'+seat_id).removeClass("tb-picked-unseat");
        $('.'+seat_id).addClass("tb-picked-seat");
      } else {
        $scope.seats.splice(index, 1);
        $('.'+seat_id).removeClass("tb-picked-seat")
        $('.'+seat_id).addClass("tb-picked-unseat");
      } 
      }

     $rootScope.seats = $scope.seats;
      angular.forEach($scope.seats, function(value, key) {
          $scope.price +=  parseInt(value.price);
      });  
     
   }

   var getIndexIfObjWithAttr = function(array,attr,value) {
      for(var i = 0; i < array.length; i++) {
          if(array[i][attr] === value) {
              return i;
          }
      }
      return -1;
   }
 var getIndexIfObj = function(array,value) {
  //console.log('hi');
  //console.log(value);
      for(var i = 0; i < array.length; i++) {
          if(array[i]['ticket'] === value) {
           // console.log('entered');
              return i;
          }
      }
      return -1;
   }

  /***************************payment process*************************************/

   $rootScope.payment_process = function(){
      if(localStorage.getItem('userData') == null){
          $rootScope.checkstate = 'showtime';
          $state.go('sidemenu.signin');
      } 
      else{
          var userData = JSON.parse(localStorage.getItem('userData'));          
          $rootScope.id = userData.id;         
          $scope.seats_new = JSON.stringify($rootScope.seats);
         // console.log($scope.seats);
          var post_data = {
                           'show_id': $rootScope.show_id,
                           'seat': $scope.seats_new,
                           'user_id':$rootScope.id
          };
          var link = 'payment_form';
          WebService.show_loading();
          var promise = WebService.send_data( link,post_data);
          promise.then(function(data){
               $rootScope.paymentdetails = data.result;
               $rootScope.last_id = data.result.insert_id;
              // console.log($rootScope.paymentdetails);
               $ionicLoading.hide();               
               $state.go('sidemenu.payment');
               //console.log($scope.paymentdetails);
         });
      }
   }
/***************************end of payment process*************************************/
})

  
.controller('pickseatCtrl', function($scope,$ionicHistory,$rootScope,WebService,$ionicLoading,$state) {
	/*collpase-in-Payment*/
 
	  $scope.toggleGroup = function(group) {
        if ($scope.isGroupShown(group)) {
             $scope.shownGroup = null;
        } 
        else {
             $scope.shownGroup = group;
        }
   	};

	  $scope.isGroupShown = function(group) {
       return $scope.shownGroup === group;
	 };

   $scope.book_now = function(){
      var post_data = $rootScope.last_id;
      var link = 'booking_complete';
      WebService.show_loading();
      var promise = WebService.send_data( link,post_data);
      promise.then(function(data){
          $rootScope.book_now_details = data.result;
        // console.log($scope.book_now_details);

        $ionicHistory.nextViewOptions({
           disableBack: true
        });
        $state.go('sidemenu.success');
          $ionicLoading.hide();     
      });
   }

   $scope.cancel=function(){
    $state.go('sidemenu.movies');
   }
})


.controller('successCtrl', function($scope,$state,$ionicHistory) {
  /*delete $rootScope.latest_movie_id;
  delete $rootScope.show_id;*/
   /* $scope.book_now_complete=function(){
         $state.go('sidemenu.home');
   }*/
   $scope.homepage=function(){

     $ionicHistory.nextViewOptions({
           disableBack: true
        });
        $state.go('sidemenu.home');
   }
   

})
.controller('locationCtrl',function($scope,WebService,$ionicLoading,$rootScope,$state){

  $scope.location = function(){
   // alert('hi');
     var post_data = "";
     var link = "location";
     WebService.show_loading();
     var promise = WebService.send_data( link,post_data);
     promise.then(function(data){
         $scope.locations = data;
          $ionicLoading.hide();     
     });

  }
  $scope.get_location = function(id){
    //console.log(id);
    $rootScope.locationid = id;
    $state.go('sidemenu.movies');
  }

})
 