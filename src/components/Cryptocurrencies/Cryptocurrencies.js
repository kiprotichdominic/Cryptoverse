import { Card, Col, Input, Row } from "antd"
import millify from "millify"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGetCryptosQuery } from "../../services/cryptoApi"
import Loader from "../Loader"

function Cryptocurrencies({ simplified }) {
    const count = simplified ? 10 : 100
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count)

    const [cryptos, setCryptos] = useState(cryptosList?.data?.coins)
    const [searchTerm, setSearchTerm] = useState('')
    console.log(cryptos);

    useEffect(() => {
        const filteredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setCryptos(filteredData)
    }, [cryptosList, searchTerm])


    if (isFetching) {
        return <Loader />
    }
    return (
        <>
            {!simplified && (
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
            )
            }
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((item) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={item.id}>
                        <Link key={item.uuid} to={`/crypto/${item.uuid}`}>
                            <Card
                                title={`${item.rank}. ${item.name}`}
                                extra={<img className="crypto-image" src={item.iconUrl} />}>
                                <p>Price: {millify(item.price)}</p>
                                <p>Market Cap: {millify(item.marketCap)}</p>
                                <p>Daily Change: {millify(item.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies