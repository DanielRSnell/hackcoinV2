import React, { Component } from 'react'
import { Table, Row, Input } from 'antd'
import R from 'next/router'
import {Router} from '../../server/router'
import n from 'numeral';

const Search = Input.Search;

const CleanPercent = (data) => {
    const number = n(data);
    const Percent = number.format('0.00');
    return Percent;
}


class CryptoList extends Component {

    state = {
        data: [],
        reset: this.props.data,
        search: ''
    }


    handleClick(data) {
        const { symbol, name } = data;
        Router.push({
            pathname: `/cryptocurrency/${symbol}`
        });
    }

    componentWillMount() {
        const { data } = this.props;
        this.setState({data: data, reset: data});
    }

    handleSearchValue(e) {
        console.log(e.target.value);
        const arr = [];
        const values = this.state.reset;
        if ( e.target.value !== '' ) {
        values.forEach( x => {
            const string = `${x.name.toLowerCase()} - ${x.symbol.toLowerCase()}`;
            const check = string.includes(e.target.value.toLowerCase());
            if ( check === true ) {
                
                if (arr.length < 10 ) {
                arr.push(x);
                }
            }
        })
        this.setState({data: arr})
    } else {
        this.setState({data: this.state.reset})
    }
    }

    render() {
        
    return (
    <Row className="padding_sm">
    <Search
    style={{marginBottom: "1rem", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.15)"}}
    placeholder="search by coin name or symbol"
    size="large"
    onSearch={value => console.log(value)}
    onChange={(x) => this.handleSearchValue(x) }
    />
    <Table
    onRowClick={x => this.handleClick(x)}
    rowKey={x => x.id}
    pagination={{pageSize: 100}}
    dataSource={this.state.data} 
    columns={columns} 
    />
    </Row>)

    
 }
}

const columns = [
    {    
        title: 'Rank',
        dataIndex: 'cmc_rank',
        key: 'cmc_rank',
        className: 'col-rank'
    },
    {
        title: 'Name',
        render: x => {
        const Format = x.name.split(' ').join('-').toString().toLowerCase();
           return ( 
            <span>
                <img src={`https://res.cloudinary.com/hackcoin/image/upload/h_32,w_32,q_auto:low/icon/${Format}.png`} className="table-img" />
                <span className="table-name">{x.name}</span>
            </span>
           )
        }
        
    },
    {
        title: 'Market Cap',
        render: x => {
            const number = n(x.quote.USD.market_cap);
            const CoinCap = number.format('$0.00a');
            return CoinCap.toUpperCase();
        }
    }, 
    {
        title: 'Price', 
        render: x => {
            const number = n(x.quote.USD.price)
            var CoinPrice = number.format('0,0.00');
            return `$${CoinPrice}`;
        }
    }, 
    {
        title: 'Volume (24h)',
        render: x => {
            const number = n(x.quote.USD.volume_24h);
            const CoinVolume = number.format('$0.00a');
            return CoinVolume.toUpperCase()
        }
    },
    {
        title: '1h',
        render: x => {
            const value = x.quote.USD.percent_change_1h;
            if (value !== null ) {
                const change = x.quote.USD.percent_change_1h.toString().includes('-');
    
            if (change === true) {
                return <span style={{color: "red"}}>{CleanPercent(value)}%</span>
            } else if (change === false ) {
                return <span style={{color: "green"}}>{CleanPercent(value)}%</span>
            }
            
        }
        }
        
    },{
        title: '24h',
        render: x => {
            const value = x.quote.USD.percent_change_24h;
            if (value !== null ) {
                const change = x.quote.USD.percent_change_24h.toString().includes('-');
    
            if (change === true) {
                return <span style={{color: "red"}}>{CleanPercent(value)}%</span>
            } else if (change === false ) {
                return <span style={{color: "green"}}>{CleanPercent(value)}%</span>
            }
            
        }
        }
        
    },{
        title: '7d',
        render: x => {
            
            const value = x.quote.USD.percent_change_7d;
            if (value !== null ) {
                const change = x.quote.USD.percent_change_7d.toString().includes('-');
    
            if (change === true) {
                return <span style={{color: "red"}}>{CleanPercent(value)}%</span>
            } else if (change === false ) {
                return <span style={{color: "green"}}>{CleanPercent(value)}%</span>
            }
            
        }
    }
        
    },
    {
        render: x => {
            const Format = x.name.split(' ').join('-').toString().toLowerCase();
           return <img src={`https://res.cloudinary.com/hackcoin/image/upload/h_48,w_164,q_auto:low/sparkline/${Format}.png`} className="table-chart" /> 
        }
    }]

export default CryptoList;