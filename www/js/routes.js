angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('sidemenu.home', {
    url: '/home',
    views: {
      'side-menu21': {
        templateUrl: 'templates/home.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('sidemenu.movies', {
    url: '/movies',
    views: {
      'side-menu21': {
        templateUrl: 'templates/movies.html',
        controller: 'moviesCtrl'
      }
    }
  })

  .state('sidemenu.blocked', {
    url: '/blocked',
    views: {
      'side-menu21': {
        templateUrl: 'templates/blocked.html',
        controller: 'homeCtrl'
      }
    }
  })

  .state('sidemenu.more', {
    url: '/more',
    views: {
      'side-menu21': {
        templateUrl: 'templates/more.html',
        controller: 'moreCtrl'
      }
    }
  })

  .state('sidemenu.sports', {
    url: '/sports',
    views: {
      'side-menu21': {
        templateUrl: 'templates/sports.html',
        controller: 'sportsCtrl'
      }
    }
  })

  .state('sidemenu', {
    url: '/sidemenu',
    templateUrl: 'templates/sidemenu.html',
    abstract:true,
    
  })

  .state('sidemenu.signin', {
    cache: false,
    url: '/signin',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signin.html',
        controller: 'signinCtrl'
      }
    }
  })

  .state('sidemenu.forgot', {
    url: '/forgot',
    views: {
      'side-menu21': {
        templateUrl: 'templates/forgot.html',
        controller: 'forgotCtrl'
      }
    }
  })

  .state('sidemenu.signup', {
    cache: false,
    url: '/signup',
    views: {
      'side-menu21': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('sidemenu.festivals', {
    url: '/festivals',
    views: {
      'side-menu21': {
        templateUrl: 'templates/festivals.html',
        controller: 'festivalsCtrl'
      }
    }
  })

  .state('sidemenu.events', {
    url: '/events',
    views: {
      'side-menu21': {
        templateUrl: 'templates/events.html',
        controller: 'eventsCtrl'
      }
    }
  })

  .state('sidemenu.trailer', {
    url: '/trailer',
    views: {
      'side-menu21': {
        cache: false,
        templateUrl: 'templates/trailer.html',
        controller: 'trailerCtrl'

      }
    }
  })

  

  .state('sidemenu.deals', {
    url: '/deals',
    views: {
      'side-menu21': {
        templateUrl: 'templates/deals.html',
        controller: 'dealsCtrl'
      }
    }
  })

  .state('sidemenu.giftcards', {
    url: '/giftcards',
    views: {
      'side-menu21': {
        templateUrl: 'templates/giftcards.html',
        controller: 'giftcardsCtrl'
      }
    }
  })

  .state('sidemenu.tickets', {
    url: '/tickets',
    views: {
      'side-menu21': {
        templateUrl: 'templates/tickets.html',
        controller: 'ticketsCtrl'
      }
    }
  })

  .state('sidemenu.myaccounts', {
    url: '/myaccounts',
    views: {
      'side-menu21': {
        templateUrl: 'templates/myaccounts.html',
        controller: 'myaccountsCtrl'
      }
    }
  })

  .state('sidemenu.trendings', {
    url: '/trendings',
    views: {
      'side-menu21': {
        templateUrl: 'templates/trendings.html',
        controller: 'trendingsCtrl'
      }
    }
  })

  .state('sidemenu.mywallet', {
    url: '/mywallet',
    views: {
      'side-menu21': {
        templateUrl: 'templates/mywallet.html',
        controller: 'mywalletCtrl'
      }
    }
  })

  .state('sidemenu.bookinghistory', {
    url: '/bookinghistory',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bookinghistory.html',
        controller: 'bookinghistoryCtrl'
      }
    }
  })

  .state('sidemenu.quickpay', {
    url: '/quickpay',
    views: {
      'side-menu21': {
        templateUrl: 'templates/quickpay.html',
        controller: 'quickpayCtrl'
      }
    }
  })

  .state('sidemenu.settings', {
    url: '/settings',
    views: {
      'side-menu21': {
        templateUrl: 'templates/settings.html',
        controller: 'settingsCtrl'
      }
    }
  })

  .state('sidemenu.pickvenue', {
    url: '/pickvenue',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pickvenue.html',
        controller: 'pickvenueCtrl'
      }
    }
  })

  .state('sidemenu.showtime', {
    url: '/showtime',
    cache: false,
    views: {
      'side-menu21': {
        templateUrl: 'templates/showtime.html',
        controller: 'showtimeCtrl',
      }
    }
  })

  .state('sidemenu.pickseat', {
    cache: false,
    url: '/pickseat',
    views: {
      'side-menu21': {
        templateUrl: 'templates/pickseat.html',
        controller: 'pickseatCtrl'
      }
    }
  })
    .state('sidemenu.payment', {
    url: '/payment',
    views: {
      'side-menu21': {
        templateUrl: 'templates/payment.html',
        controller: 'pickseatCtrl'
      }
    }
  })

  .state('sidemenu.movies2', {
    url: '/movies2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/movies2.html',
        controller: 'movies2Ctrl'
      }
    }
  })

  .state('sidemenu.movieprofile', {
    url: '/movieprofile',
    views: {
      'side-menu21': {
        templateUrl: 'templates/movieprofile.html',
        controller: 'movieprofileCtrl'
      }
    }
  })

  .state('sidemenu.trending2', {
    url: '/trending2',
    views: {
      'side-menu21': {
        templateUrl: 'templates/trending2.html',
        controller: 'trending2Ctrl'
      }
    }
  })

   .state('sidemenu.success', {
    url: '/success',
    views: {
      'side-menu21': {
        templateUrl: 'templates/success.html',
        controller: 'successCtrl'
      }
    }
  })

   .state('sidemenu.location', {
    url: '/location',
    views: {
      'side-menu21': {
        templateUrl: 'templates/location.html',
        controller: 'locationCtrl'
      }
    }
  })



$urlRouterProvider.otherwise('/sidemenu/home')

  

});