
import {Card} from "@consta/uikit/Card";
import {Text} from "@consta/uikit/Text";
import { Grid, GridItem } from '@consta/uikit/Grid';
import {Loader} from "@consta/uikit/Loader";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

import './ServicePage.css';
import {useApiQuery} from "../../store/api-actions";
import {setServices} from "../../store/store";


const ServicePage = () => {
    const services = useSelector((state) => state.services);
    useApiQuery("https://673423afa042ab85d1190055.mockapi.io/api/v1/services", setServices);


    if (services.loading) {
        return <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
            <Loader size={'m'}/>
        </div>;
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
                                <Text size="m" weight="bold" align="center">{card.name}</Text>
                            </Link>
                            <Text align="left">{card.description}</Text>
                        </Card>
                    </GridItem>
                ))}
            </Grid>
        </div>
    );
}

export default ServicePage;