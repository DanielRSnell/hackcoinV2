const mongoose = require('mongoose')

const Schema = mongoose.Schema
mongoose.Promise = global.Promise

const listitemSchema = new Schema({
    id: {type: Number, unqiue: true, required: true},
    name: {type: String, unique: true, required: true},
    symbol: String,
    slug: String,
    logo: String,
    sparkchart: String,
    cmc_rank: Number,
    date_added: String,
    num_markets: Number,
    circulating_supply: Number,
    total_supply: Number,
    max_supply: Number,
    last_updated: String, 
    quote: { 
        USD: {
            price: Number,
            volume_24h: Number,
            market_cap: Number,
            percent_change_1h: Number,
            percent_change_24h: Number,
            percent_change_7d: Number,
            last_updated: String
        }
    }
})

module.exports = mongoose.model('List', listitemSchema);