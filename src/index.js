import angular from 'angular-fix';
import apiCheckFactory from 'api-check';

const ngModule = angular.module('apiCheckAngular', []);

ngModule.constant('apiCheckFactory', apiCheckFactory);

module.exports = ngModule.name;

console.log('hi');
