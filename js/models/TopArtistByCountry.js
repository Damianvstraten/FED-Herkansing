import {Model} from 'backbone';

/**
 * Model for the top artist by country
 *
 * @constructor
 */
const TopArtistByCounty = Model.extend({
    default: {
        artistName: '',
        artistImage: ''
    }
});

export default TopArtistByCounty;