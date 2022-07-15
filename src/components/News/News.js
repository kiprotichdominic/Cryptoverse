import { Avatar, Card, Col, Row, Select, Typography } from "antd"
import moment from "moment"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useGetCryptosQuery } from "../../services/cryptoApi"
import { useGetCryptoNewsQuery } from "../../services/newsApi"

const { Text, Title } = Typography
const { Option } = Select

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

function News({ simplified }) {
    const [newsCategory, setNewsCategory] = useState("Cryptocurrency")
    const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 6 : 21 })
    const { data } = useGetCryptosQuery(100)

    console.log(cryptoNews)

    if (!cryptoNews?.value) {
        return "Loading..."
    }

    return (
        <Row gutter={[24, 24]}>
            {!simplified && (
                <Col span={24}>
                    <Select
                        showSearch
                        className="select-news"
                        placeholder="Slect a Crypto"
                        optionFilterProp="children"
                        onChange={(value) => setNewsCategory(value)}
                        filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLocaleLowerCase()) >= 0}
                    >
                        <Option value="Cryptocurrency">Cryptocurrency</Option>
                        {data?.data?.coins.map((item) => (
                            <Option value={item.name}>{item.name}</Option>
                        ))}
                    </Select>
                </Col>
            )}
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