import {View} from 'backbone';

/**
 *  View for the song collection
 *
 * @constructor
 */
const SongViewCollection = View.extend({
    tagName: 'li',
    initialize: function() {
        this.render();
    },
    render: function () {
        if(this.model.title != undefined) {
            this.$el.html("<i class='material-icons'>music_note</i>" + this.model.title);
        }
    }
});

export default SongViewCollection;
