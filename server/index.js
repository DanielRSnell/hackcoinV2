const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const passport = require('passport')
const expressValidator = require('express-validator')
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const cors = require('cors');
const routes = require('./router')
const next = require('next')
const compression = require('compression')
require('dotenv').config()

const schema = require('./data/schema')
require('./services/passport')

mongoose.connect(process.env.mongo_uri)

const port = process.env.PORT || 3000

const dev = process.env.NODE_ENV !== 'production'

const app = next({
	dev
})

const handle = routes.getRequestHandler(app)

app.prepare().then(() => {
	const server = express()
	server.use(cors())
	// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
	server.use(expressValidator())

	// populates req.cookies with any cookies that came along with the request
	server.use(cookieParser())

	// Sessions allow us to store data on visitors from request to request
	// This keeps users logged in
	server.use(
		session({
			secret: 'keyboard cat',
			key: 'token',
			resave: false,
			saveUninitialized: false,
			store: new MongoStore({
				mongooseConnection: mongoose.connection
			})
		})
	)

	// Passport JS is what we use to handle our logins
	server.use(passport.initialize())
	server.use(passport.session())

	server.use(
		'/graphql',
		bodyParser.json(),
		graphqlExpress((req, res) => {
			let context = {
				login: req.login.bind(req),
				user: req.user
			}

			return {
				schema,
				context
			}
		})
	)

	server.use(
		'/graphiql',
		graphiqlExpress({
			endpointURL: '/graphql'
		})
	)

	require('./routes')(server, passport)

	server.get('/cryptocurrency/:id', (req, res) => {
		const actualPage = '/cryptocurrency'
		const queryParams = { id: req.params.id }
		app.render(req, res, actualPage, queryParams);
	})

	server.get('*', (req, res) => {
		return handle(req, res)
	})

	// Start express server
	server.listen(port, () =>
		console.log('> GraphQL Server Listening on Port', port)
	)
})
