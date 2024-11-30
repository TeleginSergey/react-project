import { Card } from "@consta/uikit/Card";
import { Text } from "@consta/uikit/Text";
import {useApiQuery} from "../../store/api-actions";
import { Loader } from '@consta/uikit/Loader';
import './MainPage.css';

const MainPage = () => {
    const { data, loading, error } = useApiQuery('https://673423afa042ab85d1190055.mockapi.io/api/v1/main');

    if (loading) {
        return <div style={{display: "flex", alignItems: 'center', justifyContent: 'center', height: '70vh'}}>
            <Loader size={'m'}/>
        </div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
