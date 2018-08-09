import react, { Component } from 'react'
import { Col, Row } from 'antd'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import moment from 'moment';

class CryptoChart extends Component {

    CreateOptions(data) {
		const ohlc = [];
          const volume = [];
          data.forEach(x => {
            const { open, low, high, close, time, volumeto } = x;
            const convert = moment.unix(time);
            
            ohlc.push([convert._i, open, high, low, close]);

            volume.push([convert._i, volumeto]);
          })

          const groupingUnits = [[
            'week',                         // unit name
            [1]                             // allowed multiples
        ], [
            'month',
            [1, 2, 3, 4, 6]
        ]]

          const options = {
            rangeSelector: {
                selected: 0
            },
            backgroundColor: "transparent",
            fillColor: "transparent",
            fillOpacity: 0,
            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],
    
            tooltip: {
                split: true
            },
    
            series: [{
                type: 'candlestick',
                name: this.props.name,
                data: ohlc,
                dataGrouping: {
                    units: groupingUnits
                }
            }, {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            }]
        }
        return options;
	}

    render() {
        console.log(this.props);
        return (
        <Row className="padding_sm">
            <Col style={{ borderRadius: "2px" }}>
                <div style={{padding: ".5rem"}}>
            <HighchartsReact
                  className="highcharts-hackcoin"
                  highcharts={Highcharts}
                  constructorType={'stockChart'}
                  options={this.CreateOptions(this.props.data)}
                />
                </div>
            </Col>
        </Row>
        )
    }
}

export default CryptoChart;