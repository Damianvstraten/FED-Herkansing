import {View} from 'backbone';

/**
 *  View for the infobox
 *
 * @constructor
 */
const InfoBox = View.extend({
    initialize: function() {
        this.clickhandler();
    },
    clickhandler: function () {
        this.model.set({open: !this.model.get('open')});
        this.checkState();
    },
    /**
     * Toggle the class name
     * */
    checkState: function () {
        if(this.model.get('open')) {
            this.$el.addClass("active");
        } else {
            this.$el.removeClass("active");
        }
    }
});

export default InfoBox;
