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

const CoinQuery = `
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

const CoinPage = ({Info, Hist, Stats}) => {
  
  console.log(Info);
  console.log(Hist);
  console.log(Stats);
  const { id } = Info[0];
  const { name, symbol } = Stats;
  console.log(id);
  return (
    <Layout favicon={id} title={`${name} ${symbol} price, charts and detailed metrics`} description={`${name} ${symbol} historic and live price charts from all exchanges. Find all related cryptocurrency info and read about ${name}'s latest news`}>
      <PageHeader data={Info} source={Stats} />
      <CryptoChart data={Hist} name={name}/>
    </Layout>
  )
}

CoinPage.getInitialProps = async (context) => {


  const { id } = context.req.params;
  if ( id !== 'MIOTA') {
  const variables = await {
    symbol: id,
    currency: "USD",
    limit: 365
   }

   const find = await request(endpoint, CoinQuery, variables)
   .then(data => {
     const { fetchCoin, GetHistory, getInfo } = data;
     return { Info: fetchCoin, Hist: GetHistory, Stats: getInfo }
   });
  return find; 
  } else if (id === 'MIOTA') {
    const variables = await {
      symbol: "IOTA",
      currency: "USD",
      limit: 365
     }
  
     const find = await request(endpoint, CoinQuery, variables)
     .then(data => {
       const { fetchCoin, GetHistory, getInfo } = data;
       return { Info: fetchCoin, Hist: GetHistory, Stats: getInfo }
     });
    return find;
  }
}



export default withData(CoinPage);