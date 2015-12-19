'use strict';
/*global $:false, DocumentTouch */
/**
 * @ngdoc overview
 * @name portfolioApp
 * @description
 * # portfolioApp
 *
 * Main module of the application.
 */
 angular
 .module('portfolioApp', [
  'ngAnimate',
  'ngRoute',
  'ui.router',
  'ngMagnify'
  ])
 .config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise('/home');
  //
  // Now set up the states
  $stateProvider
  .state('home', {
    url : '/home',
    templateUrl : 'partials/menu.html'
  })
  .state('home.blueshoe', {
    views :  {
      'content' : {
       templateUrl: 'partials/blueshoe.html'
     }
   },
   url: '/blueshoe',

 })
  .state('home.yay', {
    views :  {
      'content' : {
       templateUrl: 'partials/yay.html'
     }
   },
   url: '/yay',

 })
  .state('home.consights', {
    views :  {
      'content' : {
       templateUrl: 'partials/consights.html'
     }
   },
   url: '/consights',

 })
  .state('home.mercur', {
    views :  {
      'content' : {
       templateUrl: 'partials/mercur.html'
     }
   },
   url: '/mercur',

 })
  .state('home.mobile', {
    views :  {
      'content' : {
       templateUrl: 'partials/mobile.html'
     }
   },
   url: '/mobile',

 })
  .state('contact', {
    url: '/contact',
    templateUrl: 'views/contact.html'
    
  })
  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html'
  })
  .state('home.work', {
    url: '/work',
    views :  {
      'content' : {
       templateUrl: 'views/work.html'
     }
   },
 });

})
 .controller('mainCtrl', function($scope,$rootScope) {
  $scope.lastPage = undefined;
  $scope.open = function(event, headline) {
    $scope.lastPage = event;
    console.log(event);
    if (event.ele !== undefined) {
      event.currentTarget = event;
    }

    $(event.currentTarget).siblings().last().css('display', 'none');
    $(event.currentTarget).siblings().animate({'width': '0%', 'padding' : '0%', opacity : 0} , 700,
      function() {
        $(event.currentTarget).siblings().css('display', 'none');    
        
      });
    $(event.currentTarget).animate({'width': '100%', 'height' : $(window).height(),  opacity : 1,} , 700);
    
    $(event.currentTarget).children().text(headline);
    $('.tab-menu-item').fadeOut(); 

  };



  $rootScope.$on('$stateChangeStart', 
    function(event, toState){ 
      console.log(event);
      if (toState.name === 'home') {
        
          $('.menu-item').css({'display' :'inline-block',
          }).children().text('');

          $('.menu-item').animate( {
            width : '16.66666667%',
            padding : '0 15px',
            height : '500px',
            opacity : 0.7,
          }, 700, function() {
            $('.menu-item').css({'display': 'inline-block', opacity : '',}).children().text('');
            $('.tab-menu-item').fadeIn();
          });
          
          
        
      }
      else {
        if ($scope.lastPage === undefined) {
          $scope.$on('$viewContentLoaded', 
function(){ var ele = $('[ui-sref="'+toState.name+'"]')[0]; ele.ele = true; $scope.open(ele); });
         
        }
        else {
          $scope.open($scope.lastPage);
        }
        $(document).scrollTop(0);
        $('.tab-menu-item').fadeOut(); 
      }
    });
});

var magnify = angular.module('ngMagnify', []);

  magnify.directive('ngMagnify', function () {
    return {
      restrict: 'EA',
      replace: true,
      template: '<div class="magnify-container" data-ng-style="getContainerStyle()">' +
                  '<div class="magnify-glass" data-ng-style="getGlassStyle()"></div>' +
                  '<img class="magnify-image" data-ng-src="{{ imageSrc }}"/>' +
                '</div>',
      scope: {
        imageSrc: '@',
        imageWidth: '=',
        imageHeight: '=',
        glassWidth: '=',
        glassHeight: '='
      },
      link: function (scope, element) {
        var glass = element.find('div'),
          image = element.find('img'),
          el, nWidth, nHeight, magnifyCSS;

        // if touch devices, do something
        if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          return;
        }
        element.on('mouseenter', function () {
          el = angular.extend(scope.getOffset(element[0]), {
            width: element[0].offsetWidth,
            height: element[0].offsetHeight,
            imageWidth: image[0].offsetWidth,
            imageHeight: image[0].offsetHeight,
            glassWidth: glass[0].offsetWidth,
            glassHeight: glass[0].offsetHeight
          });
        })
        .on('mousemove', function (evt) {
          magnifyCSS = scope.magnify(evt);

          if (magnifyCSS) {
            glass.css( magnifyCSS );
          }
        })
        .on('mouseout', function () {
          glass.on('mouseleave', function () {
            glass.css({
              opacity: 0,
              filter: 'alpha(opacity=0)'
            });
          });
        });

        scope.magnify = function (evt) {
          var mx, my, rx, ry, px, py, bgp, img;

          if (!nWidth && !nHeight) {
            img = new Image();
            img.onload = function () {
              nWidth = img.width;
              nHeight = img.height;
            };
            img.src = scope.imageSrc;
          } else {
            // IE8 uses evt.x and evt.y
            mx = (evt.pageX) ? (evt.pageX - el.left) : evt.x;
            my = (evt.pageY) ? (evt.pageY - el.top) : evt.y;

            if (mx < el.width && my < el.height && mx > 0 && my > 0) {
              glass.css({
                opacity: 1,
                filter: 'alpha(opacity=100)'
              });
            } else {
              glass.css({
                opacity: 0,
                filter: 'alpha(opacity=0)'
              });
              return;
            }

            rx = Math.round(mx/el.imageWidth*nWidth - el.glassWidth/2)*-1;
            ry = Math.round(my/el.imageHeight*nHeight - el.glassHeight/2)*-1;
            bgp = rx + 'px ' + ry + 'px';

            px = mx - el.glassWidth/2;
            py = my - el.glassHeight/2;

            return { left: px+'px', top: py+'px', backgroundPosition: bgp };
          }
          return;
        };

        scope.getOffset = function (el) {
          var offsetLeft = 0,
            offsetTop = 0;

          while (el) {
            if (!isNaN(el.offsetLeft)) {
              offsetLeft += el.offsetLeft;
              offsetTop += el.offsetTop;
            }
            el = el.offsetParent;
          }

          return {
            left: offsetLeft,
            top: offsetTop
          };
        };

        scope.getContainerStyle = function () {
          return {
            width: (scope.imageWidth) ? scope.imageWidth + 'px' : '',
            height: (scope.imageHeight) ? scope.imageHeight + 'px' : ''
          };
        };

        scope.getGlassStyle = function () {
          return {
            background: 'url(' + scope.imageSrc + ') no-repeat',
            width: (scope.glassWidth) ? scope.glassWidth + 'px' : '',
            height: (scope.glassHeight) ? scope.glassHeight + 'px' : ''
          };
        };
      }
    };
  });

