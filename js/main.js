import GoogleMapsView from './views/googleMapsView';
import {Events} from 'backbone';
import _ from 'underscore';
import States from './models/States';

(function ()
    {
        /** global variables */
        let setGlobalVariables = function () {
            window.App = {};
            App.events = _.clone(Events);
        };

        /**
         * Run after dom is ready
         */
        let init = function () {
            setGlobalVariables();

            let states = new States();
            new GoogleMapsView({el: '#googlemaps', model: states});

            Backbone.history.start({pushState: true, root: '/fed-herkansing/eindopdracht/'});
        };

        // Document ready
        window.addEventListener('load', init);
    }
)();