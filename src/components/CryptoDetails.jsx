import React, { useState } from 'react'
import HTMLReactParser from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { Col, Row, Typography, Select } from 'antd';
import millify from 'millify';
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined, TrophyOutlined, NumberOutlined, ThunderboltOutlined, CheckOutlined } from '@ant-design/icons';
import { useGetCryptoDetailsQuery } from '../services/cryptoApi';

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
    const { coinId } = useParams();
    const [timePeriod, setTimePeriod] = useState('7d')
    const { data, isFetching } = useGetCryptoDetailsQuery(coinId);

    
    const cryptoDetails = data?.data?.coin;
    const time = ['3h', '24h', '7d', '30d', '1y', '3m', '3y', '5y'];

    if (isFetching) return 'Loading....';

    return (
        <>
            <Col className="coin-detail-container">
                <Col classname="coin-heading-container">
                    <Title level={2} className="coin-name">
                        {cryptoDetails.name} ({cryptoDetails.slug}) Price
                    </Title>
                    <p>
                        {cryptoDetails.name} live price in US dollars
                    </p>
                </Col>
                <Select defaultValue="7d" className="select-timeperiod" placeholder="Select Time Period" onChange={(value) => setTimePeriod(value)}>
                    {time.map((date) => <Option key={date}>{date}</Option>)}
                </Select>
                <Col className="stats-container">
                    <Col className="coin-value-statistics">
                        <Col className="coin-value=statistics-heading">
                            <Title level={3} className="coin-details-heading">
                                {cryptoDetails.name} Value Statistics
                            </Title>
                            <p>
                                An Overview showing the statistics of {cryptoDetails.name}
                            </p>
                        </Col>
                        
                    </Col>
                </Col>
                </Col>
        </>
    )
}

export default CryptoDetails
