import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import PropTypes from 'prop-types';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";

/**
 * 
 * @param {*} param0 
 * @returns 
 */
const ButtonIcon = ({ icon, name, variant, size, tooltip, onClick, disabled, tooltipDisabled }) => {
    const renderTooltip = (args) => (
        <Tooltip id="button-tooltip" {...args}>
            {tooltip || name}
        </Tooltip >

    );

    const onClickVoid = (e) => { };

    return (
        <Fragment>
            {
                tooltipDisabled ?
                    <Button
                        variant={variant || 'outline-primary'}          // Color | ejemplo: 'outline-success'
                        size={size || 'sm'}                             // Tamaño | ejemplo: 'md'
                        onClick={onClick || onClickVoid}                // Evento onClick heredado
                        disabled={disabled || false}                    // Botón deshabilitado
                    >
                        <FontAwesomeIcon
                            icon={icon || faEye}                        // Icon | defaul 'faEye'
                        /> {name}
                    </Button> :
                    <OverlayTrigger
                        placement="bottom"                                  // Posicionamiento del mensaje tooltip
                        delay={{ show: 250, hide: 200 }}                    // Tiempo que se muestra y oculta
                        overlay={renderTooltip}                             // Mensaje tooltip a mostrar
                    >
                        <Button
                            variant={variant || 'outline-primary'}          // Color | ejemplo: 'outline-success'
                            size={size || 'sm'}                             // Tamaño | ejemplo: 'md'
                            onClick={onClick || onClickVoid}                // Evento onClick heredado
                            disabled={disabled || false}                    // Botón deshabilitado
                        >
                            <FontAwesomeIcon
                                icon={icon || faEye}                        // Icon | defaul 'faEye'
                            /> {name}
                        </Button>
                    </OverlayTrigger>
            }
        </Fragment>
    );
}

ButtonIcon.propTypes = {
    icon: PropTypes.object,
    name: PropTypes.string,
    variant: PropTypes.string,
    size: PropTypes.string,
    tooltip: PropTypes.string,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    tooltipDisabled: PropTypes.bool,
}

export default ButtonIcon;