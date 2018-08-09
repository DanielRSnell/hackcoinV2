import React, { Component } from 'react'
import { Row, Col } from 'antd'
import n from 'numeral'

const CoinLogo = {
    float: "left",
    width: "40px",
    height: "40px",
    marginRight: "10px",
    marginTop: "-.1rem"
}

const SymbolStyle = {
    color: "#f0f2f5",
    fontSize: "13px",
    fontWeight: "600",
    marginLeft: ".25rem"
}



class PageHeader extends Component {

    state ={
        ColSpan: 4,
        ColMargin: "1.5rem"
    }

    ConvertNumber(x) {
        const number = n(x);
        const format = number.format('$ 0,0.00');
        return format;
    }

    LargeNumber(x) {
        const number = n(x);
        const format = number.format('0.00 a');
        return format;
    }

    CheckValue(x) {
        const check = x.includes('-');
        if ( check === true ) {
            return <span style={{color: "red"}}>{x}</span>
        } else {
            return <span style={{color: "green"}}>{x}</span>
        }
    }

    render () {
        console.log('this is header props')
        console.log(this.props);
        const { id, logo, name, slug, symbol } = this.props.data[0]
        const { delta_1h, delta_24h, delta_30d, high_24h, low_24h, market_cap, total_volume_24h, price } = this.props.source;
        return (
            <Row style={{
                backgroundImage: "url(https://res.cloudinary.com/hackcoin/image/upload/v1533800936/main_bg.webp)", boxShadow: "0 1px 5px rgba(0, 0, 0, 0.46)"
                }} type="flex" justify="space-between">
                <Col span={24} style={{padding: "2.25rem"}} >
                    <Row span={24}>
                <Col span={5} style={{marginLeft: this.state.ColMargin}}>
                <div style={{marginTop: "1rem"}}>
             <img src={logo} style={CoinLogo}/>
                        
                        <div style={{
                            display: "inline-block",
                            boxSizing: "border-box"
                            }}>
                            <h1 style={{color: "#fff", fontSize: "1.5rem", display: "inline"}}>{name}</h1>
                            <span style={SymbolStyle}>( {symbol} )</span>
                        </div>
                        </div>
                     </Col>
                     <Col span={this.state.ColSpan} style={{marginLeft: this.state.ColMargin}}>
                        <div style={{
                            marginRight: "20px",
                            display: "inline-block",
                            boxSizing: "border-box"
                            }}>
                        <div className="global_cap" style={gloabl_box}>
                                <Row>
                                    <span className="global_header"
                                    style={global_header}>
                                        {name.toUpperCase()} PRICE
                                    </span>
                                </Row>
                                <Row>
                                    <span className="global_value"
                                    style={global_value}
                                    >
                                        {this.ConvertNumber(price)}
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
                        </div>
                        </Col>
                        <Col span={this.state.ColSpan} style={{marginLeft: this.state.ColMargin}}>
                        <div style={{
                            marginRight: "20px",
                            display: "inline-block",
                            boxSizing: "border-box"
                            }}>
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
                                        {this.LargeNumber(total_volume_24h).toUpperCase()}
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
                        </div>
                        </Col>
                        <Col span={this.state.ColSpan} style={{marginLeft: this.state.ColMargin}}>
                        <div style={{
                            marginRight: "20px",
                            display: "inline-block",
                            boxSizing: "border-box"
                            }}>
                        <div className="global_cap" style={gloabl_box}>
                                <Row>
                                    <span className="global_header"
                                    style={global_header}>
                                        24H LOW PRICE
                                    </span>
                                </Row>
                                <Row>
                                    <span className="global_value"
                                    style={global_value}
                                    >
                                        {this.ConvertNumber(low_24h)}
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
                        </div>
                        </Col>
                        <Col span={this.state.ColSpan} style={{marginLeft: this.state.ColMargin}}>
                        <div style={{
                            marginRight: "20px",
                            display: "inline-block",
                            boxSizing: "border-box"
                            }}>
                        <div className="global_cap" style={gloabl_box}>
                                <Row>
                                    <span className="global_header"
                                    style={global_header}>
                                        24H HIGH PRICE
                                    </span>
                                </Row>
                                <Row>
                                    <span className="global_value"
                                    style={global_value}
                                    >
                                        {this.ConvertNumber(high_24h)}
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
                        </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}


// styles 

const gloabl_box = {
    border: "1px #f0f2f5 solid",
    borderRadius: "2px",
    padding: "10px",
    boxShadow: "inset 0 -16px 0 0 #f0f2f5",
    height: "74px",
    boxSize: "border-box",
    minWidth: "184px"
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


export default PageHeader;