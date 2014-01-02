/* global require */
require.config({
	baseUrl: '.',
	paths: {
		leaflet: 'leaflet/dist/leaflet-src',

		mvc: 'hazdev-webutils/src/mvc',
		util: 'hazdev-webutils/src/util',
		tablist: 'hazdev-tablist/src/tablist',
		map: 'js/map',

		base: 'modules/base/0-0-1/js',
		scientific: 'modules/scientific/0-0-1/js'
		summary: 'modules/summary/0-0-1/js',
		dyfi: 'modules/dyfi/0-0-1/js',
		scientific: 'modules/scientific/0-0-1/js'
	},
	shim: {
		leaflet: {
			exports: 'L'
		}
	}
});

require([
	'EventDetails',
	'base/EventPage'
], function (
	EventDetails,
	EventPage
) {
	'use strict';

	new EventPage({
		eventDetails: EventDetails
	});
});
