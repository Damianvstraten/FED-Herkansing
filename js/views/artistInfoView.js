import _ from 'underscore'
import $ from 'jquery'
import {View} from 'backbone';
import Artist from '../models/Artist'

/**
 * View for the artist info
 *
 * @constructor
 */
const ArtistInfoView = View.extend({
    tagName: 'div',
    model: Artist,
    template: _.template($('#artist-info').html()),
    initialize: function() {
        this.render()
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
    },
});

export default ArtistInfoView;