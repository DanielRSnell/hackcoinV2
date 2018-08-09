const { makeExecutableSchema } = require('graphql-tools')
const resolvers = require('./resolvers')

const typeDefs = `
	type User {
		email: String
		fullname: String
		github: GitHub
	}
	type GitHub {
		id: Int
		name: String
		email: String
	}
	type Tickets {
		id: String
	}
	
	type GlobalUSD {
	    total_market_cap: Float
	    total_volume_24h: Float
	    last_updated: String
	}
	
	type GlobalQuote {
	    timestemp: String
	    USD: GlobalUSD
	}
	
	type Global {
		active_cryptocurrencies: Int
		active_market_pairs: Int
		active_exchanges: Int
		eth_dominance: Float
		btc_dominance: Float
		quote: GlobalQuote
	}
	type CoinHistory {
		time: Float
		high: Float
		low: Float
		open: Float
		volumefrom: Float
		volumeto: Float
		close: Float
	}

	type Coin {
		id: Int
		name: String
		symbol: String
		website_slug: String
		sparkchart: String
		logo: String
		cmc_rank: Int
		circulating_supply: Float
		total_supply: Float
		max_supply: Float
		quote: CoinQuotes
		last_updated: Int
	}
	type CoinQuotes {
		USD: CoinUSD
	}
	type CoinUSD {
		price: Float
		volume_24h: Float
		market_cap: Float
		percent_change_1h: Float
		percent_change_24h: Float
		percent_change_7d: Float
	}
	type Dom {
		bitcoin_percentage_of_market_cap: Float
	}
	type CoinUrls {
		website: [String]
		twitter: [String]
		reddit: [String]
		message_board: [String]
		announcement: [String]
		chat: [String]
		explorer: [String]
		source_code: [String]
	}

	type ExchangeInfo {
		name: String
		volume_24h: String
		price: String
	}

	type MarketInfo {
		symbol: String
		volume_24h: String
		price: String
		exchanges: [ExchangeInfo]
	}

	type CoinData {
		symbol: String
		show_symbol: String
		name: String
		rank: Int
		price: String
		market_cap: String
		total_volume_24h: String
		low_24h: String
		high_24h: String
		delta_1h: String
		delta_24h: String
		delta_7d: String
		delta_30d: String
		markets: [MarketInfo]
	}

	type CoinInfo {
		id: String
		name: String
		symbol: String
		category: String
		slug: String
		logo: String
		date_add: String
		category: String
		tags: [String]
		urls: CoinUrls
	}

	type Query {
		profile: User
		profiles: [User]
		getCoins(limit: Int!): [Coin]
		fetchCoin(symbol: String!): [CoinInfo]
		GetHistory(symbol: String!, currency: String!, limit: Int!): [CoinHistory]
		GetGlobal: Global
		GetDom: Dom
		getInfo(symbol: String!): CoinData
	}
	type Mutation {
		createUser(email: String!, fullname: String, password: String!): User
		login(email: String!, password: String!): User
		authGithub: User
	}
`

module.exports = makeExecutableSchema({ typeDefs, resolvers })
