import {Model} from 'backbone';

/**
 * Model for the Album
 *
 * @constructor
 */
const Album = Model.extend({
    default: {
        name: '',
        playcount: '',
        image: ''
    }
});

export default Album;