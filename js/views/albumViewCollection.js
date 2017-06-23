import {View} from 'backbone';
import Album from '../models/Song'

/**
 * View for the album collection
 *
 * @constructor
 */
const AlbumViewCollection = View.extend({
    tagName: 'li',
    model: Album,
    initialize: function() {
        this.render();
    },
    render: function () {
        if(this.model.name != undefined) {
            this.$el.html(
                "<h3>" + this.model.name + "</h3>" +
                "<img src='" + this.model.image + "'>"
            );
        }
    },
});

export default AlbumViewCollection;
