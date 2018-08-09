import React, { Component } from 'react';
import { Col, Row } from 'antd'
import n from 'numeral'

const gloabl_box = {
    border: "1px #f0f2f5 solid",
    borderRadius: "2px",
    padding: "10px",
    boxShadow: "inset 0 -16px 0 0 #f0f2f5",
    height: "74px",
    boxSize: "border-box"
}

const global_header = {
    color: "#f0f2f5",
    fontSize: "13px"
}

const global_value = {
    color: "#fff",
    fontSize: "18px",
    lineHeight: "22px",
    fontWeight: "600"
}

const global_note = {
    height: "13px",
    paddingTop: "7px",
    color: "#7d7d7d",
    fontSize: "11px",
    fontWeight: "bold",
    lineHeight: "13px"
}

class CoinGlobal extends Component {

    CurrencyItem(data) {
        const number = n(data)
        var CoinPrice = number.format('0.00 a');
        return CoinPrice;
    }
    
    CleanPercent(data) {
        const number = n(data)
        var Percent = number.format('0.00');
        return Percent;
    }

    render() {
        
        console.log('props global');
        console.log(this.props);
        
        const { total_market_cap, total_volume_24h } = this.props.data.quote.USD;
        
        const { btc_dominance } = this.props.data; 
        
        return (
            <Row style={{backgroundImage: "url(https://res.cloudinary.com/hackcoin/image/upload/v1533800936/main_bg.webp)", marginBottom: "1.5rem", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)"}}>
                <Col className="padding_sm">
                    <Row>
                        <Col span={10}>
                            <h2 style={{color: "#fff", marginTop: "1rem", marginLeft: ".5rem"}}>Cryptocurrency prices now</h2>
                        </Col>
                        <Col span={4}>
                            <div className="global_cap" style={gloabl_box}>
                                <Row>
                                    <span className="global_header"
                                    style={global_header}>
                                        TOTAL MARKET CAP
                                    </span>
                                </Row>
                                <Row>
                                    <span className="global_value"
                                    style={global_value}
                                    >
                                        {this.CurrencyItem(total_market_cap).toUpperCase()}
                                    </span>
                                </Row>
                                <Row style={{ borderRadius: "2px"}}>
                                    <span className="global_note"
                                    style={global_note}
                                    >
                                        USD ($)
                                    </span>
                                </Row>
                            </div>
                        </Col>
                        <Col span={4} style={{marginLeft: "2rem"}}>
                            <div className="global_cap" style={gloabl_box}>
                                <Row>
                                    <span className="global_header"
                                    style={global_header}>
                                        BITCOIN DOMINANCE
                                    </span>
                                </Row>
                                <Row>
                                    <span className="global_value"
                                    style={global_value}
                                    >
                                        {this.CleanPercent(btc_dominance)} %
                                    </span>
                                </Row>
                                <Row style={{ borderRadius: "2px"}}>
                                    <span className="global_note"
                                    style={global_note}
                                    >
                                        BTC: {this.CurrencyItem(this.props.marketcap).toUpperCase()}
                                    </span>
                                </Row>
                            </div>
                        </Col>
                        <Col span={4} style={{marginLeft: "2rem"}}>
                            <div className="global_cap" style={gloabl_box}>
                                <Row>
                                    <span className="global_header"
                                    style={global_header}>
                                        24H VOLUME
                                    </span>
                                </Row>
                                <Row>
                                    <span className="global_value"
                                    style={global_value}
                                    >
                                        {this.CurrencyItem(total_volume_24h).toUpperCase()}
                                    </span>
                                </Row>
                                <Row style={{ borderRadius: "2px"}}>
                                    <span className="global_note"
                                    style={global_note}
                                    >
                                        USD ($)
                                    </span>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

export default CoinGlobal;