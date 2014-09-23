'use strict';
/** @jsx React.DOM */
var React = require('react');
var Catalogue = require('../components/app-catalogue.js');
var AppActions = require('../actions/app-actions.js');

var APP = React.createClass({
  render: function(){
    return (
      <div>
        <h1>Let's Shop</h1>
        <Catalogue />
      </div>
      );
  }
});

module.exports = APP;