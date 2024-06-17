import { useState } from "react";
import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import { Heading } from "@chakra-ui/layout";
import { useTranslation } from "react-i18next";

const ModalComp = (props) => {
    const {
        onClose,
        title,
        body,
        footer,
        size,
        keyboard,
        backdrop } = props;

    const [show, setShow] = useState(true);
    const [t, i18n] = useTranslation('global');

    const handleClose = () => {
        onClose();
        setShow(false);
    }

    return (
        <Modal
            show={show}                                 // Indica si el modal está activo
            onHide={handleClose}                        // Función para cerrar modal
            size={size ? size : 'md'}                   // Tamaño mediano por default
            backdrop={backdrop || 'static'}   // No se puede hacer click afuera por default
            keyboard={keyboard || false}      // No se puede salir del modal presionando ESC
        >
            <Modal.Header closeButton>
                <Modal.Title><Heading size='lg'>{title || t('layouts.modal.loading-title')}</Heading></Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>

            {   // Si hay footer se muestra la sección
                footer ? <Modal.Footer>{footer}</Modal.Footer> : null
            }
        </Modal>
    );
}

ModalComp.propTypes = {
    onClose: PropTypes.any,
    title: PropTypes.string.isRequired,
    body: PropTypes.any.isRequired,
    footer: PropTypes.any,
    size: PropTypes.string,
    keyboard: PropTypes.string,
    backdrop: PropTypes.string
}

export default ModalComp;