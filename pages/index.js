import React, {Component} from 'react'
import Link from 'next/link'
import withData from '../lib/withData'
import CoinList from '../query/CoinList'
import checkLoggedIn from '../lib/checkLoggedIn'
// import { checkLoggedIn } from ~'../lib'
import Layout from '../components/layout'
import Promo from '../components/promo'
import CryptoList from '../components/crypto'
import CoinGlobal from '../components/crypto/global'
import gql from 'graphql-tag'
import { Row, Col } from 'antd'
import { request } from 'graphql-request'
import { Query } from 'react-apollo'
import n from 'numeral'

import { ApolloCache } from 'apollo-cache';

const ConvertNumber = (value) => {
	const number = n(value);
	const format = number.format('0.00 a');
	return format;
}

class Index extends Component {
	static async getInitialProps({req}, apolloClient, context) {
		return await apolloClient.query({
			query: SingleQuery
		})
	}

	render() {
		console.log(this.props);

	const { GetGlobal, getCoins } = this.props.data;
	const { id } = getCoins[0]
	const marketcap = getCoins[0].quote.USD.market_cap
	
	return (
		<Layout 
		title={'Hackcoin - Cryptocurrency prices and market data'}
		favicon={id}
		description={'Live and historic cryptocurrency prices, news, charts and coin rankings. Portfolio tracking, price alerts and other advanced tools.'}>
			<CoinGlobal data={GetGlobal} marketcap={marketcap} />
			<CryptoList data={getCoins} />
			
		</Layout>
	)
	

	}
}

const SingleQuery = gql`{
	getCoins(limit: 1700) {
		id
		cmc_rank
		name
		symbol
		quote {
		  USD {
			price
			volume_24h
			market_cap
			percent_change_1h
			percent_change_24h
			percent_change_7d
		  }
		}
	}
	  GetGlobal {
    active_exchanges
    active_cryptocurrencies
    active_market_pairs
    eth_dominance
    btc_dominance
    quote {
      USD {
        total_market_cap
        total_volume_24h
      }
    }
  }                   
}`




export default withData( Index )
