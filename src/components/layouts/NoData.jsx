import { Empty } from "antd";
import { useTranslation } from "react-i18next";

const NoData = () => {
    const [t, i18n] = useTranslation('global');

    return (
        <Empty
            description={
                <span>
                    {
                        t('layouts.no-data.message')
                    }
                </span>
            }
        />
    );
}

export default NoData;