import gql from 'graphql-tag'

export default (context, apolloClient) => {
 
  return apolloClient
		.query({
			query: gql`{
        getCoins {
          id
          rank
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
          coins
          markets
          total_market_cap
          total_volume_24h
          last_updated_timestamp
          }
          GetDom {
          bitcoin_percentage_of_market_cap
          }                    
      }
			`
		})
		.then(({data}) => {
            return { coins: data }
        })
		.catch(e => {
            console.log(e);
            // Fail gracefully
            return { coins: {} }
		})
}
