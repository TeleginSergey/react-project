import React, {useEffect, useState} from "react";
import {Card} from "@consta/uikit/Card";
import {Text} from "@consta/uikit/Text";
import './ServicePage.css';
import { Grid, GridItem } from '@consta/uikit/Grid';
import {useApiQuery} from "../../store/api-actions";
import {Loader} from "@consta/uikit/Loader";


const ServicePage = () => {
    const { data, loading, error } = useApiQuery('https://673423afa042ab85d1190055.mockapi.io/api/v1/services');

    if (loading) {
        return <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
            <Loader size={'m'}/>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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