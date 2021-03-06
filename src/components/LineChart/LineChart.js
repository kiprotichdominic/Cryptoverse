import { Col, Row, Typography } from "antd"
import { Line } from "react-chartjs-2"

import { Chart as ChartJS, } from 'chart.js';


const { Title } = Typography

function LineChart({ coinHistory, currentPrice, coinName }) {
    const coinPrice = []
    const coinTimeStamp = []

    for (let i = 0; i < coinHistory?.data?.history?.length; i++) {
        coinTimeStamp.push(
            new Date(coinHistory.data.history[i].timestamp).toLocaleDateString()
        );
        coinPrice.push(coinHistory.data.history[i].price);
    }
    console.log(coinHistory);
    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: 'Price In USD',
                data: coinPrice,
                fill: false,
                backgroundColor: '#0071bd',
                borderColor: '#0071bd',
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };
    return (
        <>
            <Row className="chart-header">
                <Title level={2} className="chart-title">
                    {coinName} Price Chart
                </Title>
                <Col className="price-container">
                    <Title level={5} className="price-change">
                        Change: {coinHistory?.data?.change}%
                    </Title>
                    <Title level={5} className="current-price">
                        Current {coinName} Price: $ {currentPrice}
                    </Title>
                </Col>
            </Row>
            <Line data={data} options={options} />
        </>
    )
}

export default LineChart