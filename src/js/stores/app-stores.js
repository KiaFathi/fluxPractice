'use strict';

var AppDispatcher = require('../dispatchers/app-dispatcher.js');
var Constants = require('../constants/app-constants.js');
var merge = require('react/lib/merge');
var EventEmitter = require('events').EventEmitter;

var CHANGE_EVENT = 'change';

var _catalog = [
  {id:1, title: 'Widget #1', cost: 1},
  {id:2, title: 'Widget #2', cost: 2},
  {id:3, title: 'Widget #3', cost: 3}
];

var _cartItems = [];

var _removeItems = function(index){
  _cartItems[index].inCart = false;
  _cartItems.splice(index, 1);
};

var _increaseItems = function(index){
  _cartItems[index].qty++;
};

var _decreaseItems = function(index){
  if(_cartItems[index].qty > 1){
    _cartItems[index].qty--;
  } else {
    _removeItems(index);
  }
};

var AppStore = merge(EventEmitter.prototype, {
  emitChange : function(){
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback){
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback){
    this.removeListener(CHANGE_EVENT, callback);
  },
  getCart: function(){
    return _cartItems;
  },
  getCatalog: function(){
    return _catalog;
  },
  dispatcherIndex: AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;

      case AppConstants.REMOVE_ITEM:
        _removeItem(payload.action.index);
        break;

      case AppConstants.INCREASE_ITEM:
        _increaseItem(payload.action.index);
        break;

      case AppConstants.DECREASE_ITEM:
        _decreaseItem(payload.action.index);
        break;
    }
    AppStore.emitChange();

    return true;
  })
});

module.exports = AppStore;