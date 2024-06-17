import { Carousel } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const CarouselComponent = (props) => {
    const { evidences, loading } = props;
    const [t, i18n] = useTranslation('global');

    return (
        <Carousel>
            {
                !loading && (
                    evidences?.map((evidence, index) =>
                        <Carousel.Item key={index} style={{ height: '450px', width: '100%' }}>
                            <img
                                className="d-block w-100"
                                src={evidence}
                                alt={t('layouts.carousel.loading')}
                            />
                            <Carousel.Caption>
                                <h1 style={{ color: '#FFF', fontWeight: 'bolder' }}>
                                    {t('layouts.carousel.title')} {index + 1}
                                </h1>
                            </Carousel.Caption>
                        </Carousel.Item>
                    )
                )
            }
        </Carousel>
    );
}

CarouselComponent.propTypes = {
    evidences: PropTypes.array
}

export default CarouselComponent;