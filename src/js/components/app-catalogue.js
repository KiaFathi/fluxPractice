'use strict';
/** @jsx React.DOM */
var React= require('react');
var AppStore = require('../stores/app-stores.js');
var AddToCart = require('../components/app-addToCart.js');

function getCatalog(){
  return {items: AppStore.getCatalog()};
}


var Catalogue = React.createClass({
  getInitialState: function(){
    return getCatalog();
  },
  render: function(){
    var items = this.state.items.map(function(item){
      return (
        <tr><td>{item.title}</td><td>{item.cost}</td><td><AddToCart item={item}/></td></tr>
        );
    });
    return (
      <table className="table">
      {items}
      </table>
      );
  }
});

module.exports = Catalogue;
