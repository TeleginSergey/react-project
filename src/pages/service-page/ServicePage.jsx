import React, {useEffect, useState} from "react";
import {Card} from "@consta/uikit/Card";
import {Text} from "@consta/uikit/Text";
import './ServicePage.css';
import { Grid, GridItem } from '@consta/uikit/Grid';


const ServicePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('https://673423afa042ab85d1190055.mockapi.io/api/v1/services');
            const data = await response.json();
            setData(data);
        }
        fetchData();
    }, []);

    return (
        <div className="card-container">
            <Grid gap={"m"} cols={3}>
                {data.map((card, index) => (
                <GridItem>
                    <Card key={index} verticalSpace="m" horizontalSpace="xl" form="round" className="rounded-card-main">
                        <Text size="m" weight="bold" align="center">{card.name}</Text>
                        <Text align="left">{card.description}</Text>
                    </Card>
                </GridItem>
            ))}
            </Grid>
        </div>
    );
}

export default ServicePage;