import React, { useEffect, useState } from 'react';
import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import './MainPage.css';

const MainPage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/main');
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <div>
            {data.map((card, index) => (
                <Card key={index} verticalSpace="m" horizontalSpace="xl" form="round" className="rounded-card-main">
                    <Text size="m" weight="bold">{card.name}</Text> {/* Отображение названия карточки */}
                    <Text>{card.description}</Text>
                    <div className="card-footer">
                        <Text size="s" weight="regular" view="secondary">
                            {card.createdAt}
                        </Text>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default MainPage;
