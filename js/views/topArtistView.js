import {View} from 'backbone';
import _ from 'underscore';
import $ from 'jquery';
import Songs from '../collections/Songs';
import Albums from '../collections/Albums';
import GoogleMapsView from '../views/googleMapsView';
import InfoBox from '../views/infoBox';
import States from '../models/States';
import Artist from '../models/Artist';

/**
 * View for the top artists collection
 *
 * @constructor
 */
const TopAristView = View.extend({
    tagName: 'li',
    template: _.template('<h3><%= name %></h3><img class="top-artist-image" src="' + '<%= image %>' +  '" alt="' + '<%= name %>' +  '">'),
    initialize: function() {
        this.imageClick();
        this.render();
    },
    render: function () {
        if(this.model.name != undefined) {
            this.$el.html(this.template(this.model));
        }
    },
    /**
     * Load all data for the artist on image click
     */
    imageClick: function () {
        $(".top-artist-image").unbind('click').click(function () {
            $('.artist-info').html('');
            $('.songs').html('');
            $('.albums').html('');

            let statesModel = new States();
            new InfoBox({el: '#info-wrapper', model: statesModel});
            new GoogleMapsView({el: '#googlemaps', model: statesModel});

            let name = this.alt;
            let newName = name.split(' ').join('+');

            new Songs(newName).fetch();
            new Artist(newName).fetch();
            new Albums(newName).fetch();

        })
    }
});

export default TopAristView;
