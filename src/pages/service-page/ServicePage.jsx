import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Grid, GridItem } from '@consta/uikit/Grid';
import { Loader } from "@consta/uikit/Loader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useApiQuery } from "../../store/api-actions";
import { setServices } from "../../store/store";
import './ServicePage.css';

const ServicePage = () => {
    const services = useSelector((state) => state.services);
    useApiQuery("https://673423afa042ab85d1190055.mockapi.io/api/v1/services", setServices);

    if (services.loading) {
        return (
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'center', height: '70vh' }}>
                <Loader size={'m'} />
            </div>
        );
    }

    if (services.error) {
        return <div>Error: {services.error.message}</div>;
    }

    return (
        <div className="card-container">
            <Grid gap={"m"} cols={3}>
                {services.map((card, index) => (
                    <GridItem key={index}>
                        <Card verticalSpace="m" horizontalSpace="xl" form="round" className="rounded-card-main">
                            <Link to={`http://localhost:3000/service/${card.id}`}>
                                <Text size="m" weight="bold" align="center" style={{ lineHeight: '1.2' }}>{card.name}</Text>
                            </Link>
                            {card.image && <img src={card.image} alt={card.name} className="service-detail-image" />}
                            <Text align="left" style={{ lineHeight: '1.2' }}>{card.description}</Text>
                        </Card>
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
}

export default ServicePage;
