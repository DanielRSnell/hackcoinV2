const User = require('../models/User')
const List = require('../models/List')
const passport = require('passport')
const axios = require('axios');
const cmc_api = process.env.cmc_uri.process;
const api = process.env.pro_key_uri
const api_url = process.env.cmc_pro_uri
const coinlib_global = process.env.coinlib_uri
const Dataloader = require('dataloader')

module.exports = {
	Query: {
		profile(root, args, req) {
			return new Promise((resolve, reject) => {
				console.log(req);
				if (req.user) {
					return resolve(req.user)
				}

				return reject('Not Authenticated!')
			})
		},
		getInfo(root, args, req) {
			const { symbol } = args;
			return axios.get(`https://coinlib.io/api/v1/coin?key=00f5c436cfdb1810&symbol=${symbol}`).then(res => res.data)
		},
		GetDom(root, args, req) {
			return axios.get('https://api.coinmarketcap.com/v2/global/')
			.then(res => {
				
				return res.data.data
			});
		},
		GetGlobal(root, args, req) {
			return axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest?CMC_PRO_API_KEY=31fa9945-acf5-493b-8fb4-79b04c954a00')
					.then(res => res.data.data);
		},
		fetchCoin(root, args, req) {
			return axios.get(`${api_url}info?CMC_PRO_API_KEY=${api}&symbol=${args.symbol}`)
    		.then(res => {

				const values = Object.values(res.data.data);
				console.log(values);
				return values;
			
			});
		},
		GetHistory: async (root, args, req) => {
			const { symbol, currency, limit } = args;
			const fetch = await axios.get(`https://min-api.cryptocompare.com/data/histoday?fsym=${symbol}&tsym=${currency}&limit=${limit}`)
			.then( res => {
				console.log(res.data.Data);
				return res.data.Data;
			})
			return fetch;
		},
		getCoins: async(root, args, req) => {
			if (args.limit) {
			const sortParam = {'quote.USD.market_cap': 'desc'};
			return await List.find().sort(sortParam).limit(args.limit).then(res => res);
			}
			const sortParam = {'quote.USD.market_cap': 'desc'};
			return await List.find().sort(sortParam).then(res => res);
			
		},
		profiles: async (root, args, req) => {
			if (req.user) {
			const Users = await User.find();
			return Users.map((x) => {
				x._id = x._id.toString();
				console.log(x);
				return x;
			})
		} 
			return reject('Not Authenticated!');
		}
	},
	Mutation: {
		createUser(root, { email, fullname, password }, { login }) {
			const user = new User({ email, fullname })

			return new Promise((resolve, reject) => {
				return User.register(user, password, err => {
					if (err) {
						reject(err)
					} else {
						login(user, () => resolve(user))
					}
				})
			})
		},
		login(root, { email, password }, { login }) {
			return new Promise((resolve, reject) => {
				return User.authenticate()(email, password, (err, user) => {
					// user returns false if username / email incorrect
					if (user) {
						login(user, () => resolve(user))
					} else {
						reject('Email / Password Incorrect')
					}
				})
			})
		},
		authGithub(root, args, { statusCode, setHeader, res }) {
			return new Promise((resolve, reject) => {
				return passport.authenticate('github', (err, user) => {
					if (user) {
						resolve(user)
					} else {
						reject(err)
					}
				})({}, { statusCode, setHeader, end })
			})
		}
	}
}
