'use strict';

require('./_checkout.scss');

// module.exports = ['$log', '$rootScope', '$stateParams', '$window', 'profileService', CartController];

module.exports = {
  template: require('./checkout.html'),
  controller: ['$log', '$rootScope', '$stateParams', '$window', 'orderService', CheckoutController],
  controllerAs: 'checkoutCtrl',
  bindings: {
    page: '<',
  }
};

function CheckoutController($log, $rootScope, $stateParams, $window, orderService) {
  $log.debug('CheckoutController');

  this.$onInit = function(){
    this.merches = JSON.parse($window.localStorage.merch);
    console.log(this.merches);
  };

  this.checkout = () => {
    let obj = {};
    for( let prop in this.merches) {
      let merch = this.merches[prop];
      if(!obj[merch.posterID]) obj[merch.posterID] = { info: this.order, orders: [] };

      obj[merch.posterID].orders.push({ option: merch._id, amount: merch.count});
    }

    for( let prop in obj) {
      console.log('|^|', obj[prop]);
      orderService.createOrder(prop, obj[prop])
      .then( res => console.log('Success', res));
    }
  };



  



}