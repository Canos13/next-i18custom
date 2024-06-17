import { Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

const SpinnerComponent = () => {

    const [t, i18n] = useTranslation('global');
    const prefix = 'layouts.spinner'; 
    return (
        <Spinner animation="border" role="status">
            <span className="visually-hidden">{t(`${prefix}.loading`)}</span>
        </Spinner>
    );
}

export default SpinnerComponent;