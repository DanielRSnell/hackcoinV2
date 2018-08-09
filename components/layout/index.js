import Head from 'next/head'
import { LocaleProvider } from 'antd'
import { Layout, Row } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import Menu from '../menus/menu'
const { Footer } = Layout;
export default ({ title, sit, favicon, description, children }) =>
  <div>
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

    <meta property="og:image" content="http://danielrsnell.com/coffee/wp-content/uploads/2018/08/hackcoindata-done-right..jpg" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='shortcut icon' type='image/x-icon'  href={`https://s2.coinmarketcap.com/static/img/coins/16x16/${favicon}.png`} />
      <meta charSet='utf-8' />
      <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/antd/3.6.4/antd.min.css' />
    </Head>
    <style jsx global>{`
      body {
        background-image: url(https://res.cloudinary.com/hackcoin/image/upload/v1533802217/integration_bg.png);
        background: transparent!important;
        color: #262626;
        font-size: 14px;
        font-family: "proxima-nova",sans-serif;
        font-variant-numeric: tabular-nums;
        -moz-font-feature-settings: "tnum" 1;
        -moz-font-feature-settings: "tnum=1";
        -webkit-font-feature-settings: 'tnum' 1;
        font-feature-settings: 'tnum' 1;
    
      }
      th {
        background: transparent!important;
        border: none!important;
        font-weight: bold!important;
      }
      td {
        background: transparent;
      }
      .table-name {
        margin-left: .5rem;
      }
      .menu-hover:hover {
        border: 1px sold #6a53ff;
      }
      .menu-link {
        font-weight: 600;
        font-size: 13px;
        text-transform: uppercase;
        transition: 1s;
      }
      .highcharts-point {
        fill: rgba(106, 83, 255, 0.1);
        stroke: #6a53ff;
      }
      .menu-link:hover {
        color: #6a53ff!important;
      }
      .ant-menu-item-active {
        background: none!important;
        border: none!important;
      }
      .padding_sm {
        margin: 2rem;
      }
      .table-chart {
        filter: hue-rotate(200deg);
      }
      .highcharts-graph {
        stroke: #6a53ff
      }
      .highcharts-area {
        fill: rgba(106, 83, 255, 0.1);
      }
      .highcharts-point:hover {
        color
      }
      .highcharts-credits {
        display: none;
      }
      .highcharts-background {
        fill: transparent!important;
      }
      .highcharts-button-box {
        background: #6a53ff;
        color: #f0f2f5;
      }
      .highcharts-point-down {
        fill: #6a53ff;
      }

    `}</style>
    <LocaleProvider locale={enUS}>
    <Layout style={{minHeight: "100%", backgroundImage: "url(https://res.cloudinary.com/hackcoin/image/upload/v1533802217/integration_bg.png)"}}>
      <Menu sit={sit} />
      <Row>{children}</Row>
      <Footer style={{ textAlign: 'center', background: "transparent", height: "15vh" }}>
								<strong>Hackcoin</strong> ©2018 <strong>Kickass Data</strong>{' '}
								and <strong>Unicorns</strong>.
							</Footer>
      </Layout>
    </LocaleProvider>
  </div>