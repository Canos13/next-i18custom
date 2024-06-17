import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { Alert, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { Heading } from "@chakra-ui/react";
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const mapStyles = {
    width: '94%',
    height: '50vh'
};

const MapComponent = (props) => {
    const { loading } = props;
    const [initialCenter, setInitialCenter] = useState({ lat: 0, lng: 0 });
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [activeMarker, setActiveMarker] = useState({});
    const [showingInfoWindow, setShowingInfoWindow] = useState(false);
    const [selectedPlace, setselectedPlace] = useState({});
    const [errorMap, setErrorMap] = useState(false);
    const [t, i18n] = useTranslation('global');

    useEffect(() => {
        // console.log("PROPS MAPS: ", props);
        try {
            let { latitude, longitude } = props.ubications[0].position;
            setInitialCenter({ lat: latitude, lng: longitude });
            setCenter({ lat: latitude, lng: longitude });
        } catch (error) {
            setErrorMap(true);
        }
    }, [props]);

    const onMarkerClick = (props, marker) => {
        setselectedPlace(props);
        setActiveMarker(marker);
        setShowingInfoWindow(true);

    };

    const onMapClicked = () => {
        if (showingInfoWindow) {
            setShowingInfoWindow(false);
            setActiveMarker(null);
        }
    };

    return (
        <div style={{ height: '50vh', width: '100%' }}>
            {
                !loading && errorMap ?
                    <Alert variant='danger'>
                        {t('layouts.map.error')}
                    </Alert> :
                    loading ? <p>{t('layouts.map.loading')}</p> :
                        <Map google={props.google}
                            style={mapStyles}
                            className={'map'}
                            zoom={18}
                            initialCenter={initialCenter}
                            center={center}
                            onClick={onMapClicked}
                        >
                            {
                                props.ubications.map((item, i) =>
                                    <Marker
                                        key={`marker-${i}`}
                                        title={item.title}
                                        name={item.name}
                                        onClick={onMarkerClick}
                                        position={{ lat: item.position.latitude, lng: item.position.longitude }}
                                    />
                                )
                            }
                            <InfoWindow
                                marker={activeMarker}
                                visible={showingInfoWindow}>
                                <Form>
                                    <Heading style={{ color: 'black' }}>{selectedPlace.title}</Heading>
                                    <p id={'name_id'}>{selectedPlace.name}</p>
                                    <Form.Text id="name_id" muted>
                                    </Form.Text>
                                </Form>
                            </InfoWindow>
                        </Map>
            }

        </div>
    );
}

MapComponent.propsTypes = {
    ubications: PropTypes.object
}

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_API_KEY
})(MapComponent);