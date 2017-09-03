import * as React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {bithumbApiTicker} from 'bit-stream/dist/modules/api/bithumb'
import {BTC, Ticker} from 'bit-stream'
import {RootState} from '../@types/store'
import {BootstrapTable as Table, TableHeaderColumn as Th} from 'react-bootstrap-table'
import {comma, date, w1000} from '../utils/formatter'
import * as Chart from 'react-highcharts'
import {Graph} from 'rickshaw'

export const Home = connect<S, D, O>(
  (state: RootState) => {
    return {
      tickers: state.bit.bithumb.tickers
    }
  },
  dispatch => bindActionCreators({
    bithumbApiTicker
  }, dispatch)
)(
  class Home extends React.Component<Props, State> {
    state = {
      closingPrices: [],
      graphData: []
    }
    private timer
    private graph
    private elGraph
    private renderRickshaw = () => this.graph.render()

    render() {
      if (!this.props.tickers) {
        return <div>loading...</div>
      }
      const tickers = this.props.tickers.slice(0, 10)

      return (
        <div className="row Home">
          <div ref={r => this.elGraph = r}/>
          <hr/>

          <ChartWrapper data={this.state.closingPrices} />
          <hr/>

          <Table data={tickers}>
            <Th dataField="date" dataAlign="center" width="140" dataFormat={date} isKey>날짜</Th>
            <Th dataField="closingPrice" dataAlign="center" width="140" dataFormat={w1000}>현재 가격</Th>
            <Th dataField="buyPrice" dataAlign="center" width="140" dataFormat={w1000}>사겠다!</Th>
            <Th dataField="sellPrice" dataAlign="center" width="140" dataFormat={w1000}>팔겠다!</Th>
            <Th dataField="openingPrice" dataAlign="center" width="140" dataFormat={w1000}>24시간 전 가격</Th>
            <Th dataField="averagePrice" dataAlign="center" width="140" dataFormat={w1000}>평균 가격</Th>
            <Th dataField="minPrice" dataAlign="center" width="140" dataFormat={w1000}>최소 가격</Th>
            <Th dataField="maxPrice" dataAlign="center" width="140" dataFormat={w1000}>최대 가격</Th>
            {/*<Th dataField="unitsTraded" dataAlign="center" width="140" dataFormat={comma}>거래 량</Th>*/}
            <Th dataField="volume1Day" dataAlign="center" width="140" dataFormat={comma}>24시간 거래량</Th>
            <Th dataField="volume7Day" dataAlign="center" width="140" dataFormat={comma}>7일 거래량</Th>
          </Table>
        </div>
      )
    }

    componentDidMount() {
      const getGraphData = () => {
        return this.state.graphData
      }
      this.timer = setInterval(_ => this.props.bithumbApiTicker(BTC), 1000)
      this.graph = new Graph({
        element: this.elGraph,
        height: 200,
        series: [{
          color: 'steelblue',
          name: 'cat',
          get data() {
            return getGraphData()
          }
        }]
      })

      this.graph.render()
    }

    componentWillReceiveProps(props: Props) {
      const closingPrices = this.state.closingPrices.concat(props.tickers[0].closingPrice)
      const min = closingPrices.reduce((min, curr) => min = (min > curr) ? curr : min, 99999999)
      this.setState({
        closingPrices,
        graphData: closingPrices.map((y, x) => ({x, y: (y - min)+1000}))
      }, this.renderRickshaw)
    }

    componentWillUnmount() {
      clearInterval(this.timer)
    }
  }
)

interface S {
  tickers: Ticker[]
}
interface D {
  bithumbApiTicker: typeof bithumbApiTicker
}
interface O {
}

type Props = S & D & O
interface State {
  closingPrices: any[],
  graphData: any[]
}

const ChartWrapper = props =>
  <Chart config={{
    chart: {
      animation: false
    },
    rangeSelector: {
      selected: 1
    },
    title: {
      text: '현재가격'
    },
    series: [{
      name: '현재가격',
      data: props.data
    }]
  }}/>
