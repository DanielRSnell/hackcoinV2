// pages/blog.js
import React from 'react'
import gql from "graphql-tag";
import { graphql, Query } from 'react-apollo'
import CoinList from '../query/CoinList'
import withData from '../lib/withData'
import Layout from '../components/layout'
import {Router} from '../server/router'
import { Row, Col } from 'antd'

//Request
import { request } from 'graphql-request'

//components 
import CryptoChart from '../components/coinpage/chart'
import PageHeader from '../components/coinpage/header'

//endpoints
const endpoint = 'https://hackcoin-ssr.herokuapp.com/graphql'

const CoinQuery = gql`
query CoinPage($symbol: String!, $currency: String!, $limit: Int!) {
  getInfo(symbol: $symbol) {
    rank
    name
    price
    symbol
    market_cap
    total_volume_24h
    low_24h
    high_24h
    delta_1h
    delta_24h
    delta_24h
    delta_30d
    markets {
      symbol
      volume_24h
      price
      exchanges {
        name
        volume_24h
        price
      }
    }
  }
  GetHistory(symbol: $symbol, currency: $currency, limit: $limit) {
    time
    open
    high
    low
    close
    volumefrom
    volumeto
  }
  fetchCoin(symbol: $symbol) {
    id
    name
    symbol
    category
    slug
    date_add
    logo
    urls {
      website
      twitter
      reddit
      chat
      source_code
      message_board
      announcement
      explorer
    }
    tags
  }
}`;

const CoinPage = ({CoinPage}) => {
  
  const id = 'test'
  const name = 'test'
  const symbol = 'test'

  return (
    <Layout favicon={id} title={`${name} ${symbol} price, charts and detailed metrics`} description={`${name} ${symbol} historic and live price charts from all exchanges. Find all related cryptocurrency info and read about ${name}'s latest news`}>
      This is a test
    </Layout>
  )
}

CoinPage.getInitialProps = async ({req}, apolloClient, context) => {
  
  const { id } = await req.params;
  const keys = {
    symbol: id,
    currency: "USD",
    limit: 365
  }
  return await apolloClient.query({query: CoinQuery}, {variables: keys});
  
}



export default withData(CoinPage);