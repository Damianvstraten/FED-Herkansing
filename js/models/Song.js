import {Model} from 'backbone';

/**
 * Model for the Song
 *
 * @constructor
 */
const Song = Model.extend({
    tagName: 'li',
    default: {
        artist: '',
        title: '',
        listeners: '',
        playcount: '',
    },
});

export default Song;