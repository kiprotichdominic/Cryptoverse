import { Avatar, Card, Col, Row, Select, Typography } from "antd"
import moment from "moment"
import { Link } from "react-router-dom"
import { useGetCryptoNewsQuery } from "../../services/newsApi"

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

function News({ simplified }) {
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory: 'Cryptocurrency', count: simplified ? 6 : 21 })

    console.log(cryptoNews)

    if (!cryptoNews?.value) {
        return "Loading..."
    }

    return (
        <Row gutter={[24, 24]}>
            {cryptoNews?.value.map((item, index) => (
                <Col xs={24} sm={12} lg={8} key={index}>
                    <Card hoverable className="news-card">
                        <a href={item.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={4}>{item.name}</Title>
                                <img src={item?.image?.thumbnail?.contentUrl || demoImage} alt={item.title} />
                            </div>
                            <p>
                                {item.description > 100
                                    ? `${item.description.substring(0, 100)}...`
                                    : item.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={item.provider[0]?.image?.thumbnail?.contentUrl || demoImage.url} alt="news" />
                                    <Text className="provider-name">{item.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(item.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News