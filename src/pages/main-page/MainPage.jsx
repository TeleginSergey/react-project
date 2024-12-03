import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import { Loader } from '@consta/uikit/Loader';
import {useSelector} from "react-redux";

import {useApiQuery} from "../../store/api-actions";
import {setNews} from "../../store/store";
import './MainPage.css';


const MainPage = () => {
    const mainNews = useSelector((state) => state.mainNews);

    useApiQuery("https://673423afa042ab85d1190055.mockapi.io/api/v1/main", setNews, false);

    if (mainNews.loading) {
        return <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
            <Loader size={'m'}/>
        </div>;
    }

    if (mainNews.error) {
        return <div>Error: {mainNews.error.message}</div>;
    }
    let options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' };

    return (
        <div>
            {mainNews.map((card, index) => (
                <Card key={index} verticalSpace="m" horizontalSpace="xl" form="round" className="rounded-card-main">
                    <Text size="m" weight="bold">{card.name}</Text>
                    <Text>{card.description}</Text>
                    <div className="card-footer">
                        <Text size="s" weight="regular" view="secondary">
                            {new Date(card.createdAt).toLocaleString('ru-RU', options)}
                        </Text>
                    </div>
                </Card>
            ))}
        </div>
    );
}

export default MainPage;
