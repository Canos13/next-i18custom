import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react';
import { Col, Form, } from 'react-bootstrap';
import PropTypes from 'prop-types';

const FormIcon = (props) => {

    const {
        title,              // Etiqueta LABEL
        icon,               // Icono que se muestra a la izquierda
        placeholder,        // Etiqueta de fondo del input
        type,               // Tipo de datos que admite el input
        name,               // Propiedad name del input
        defaultValue,       // Valor por dafault
        value,              // Valor asignado
        handleChange,       // Método onChange
        readOnly,           // Input de sólo lectura
        disabled,           // Para deshabilitar el input
        accept,             // Para input file, accepts only MIME TYPES
        styleInput,         // Estilos para el INPUT
        re_icon,            // Rigth element icon
        re_onClick,         // Evento onClik para el botón de la derecha
        ig_hidden,          // Indica si el inputGroup va oculto
        onKeyDown,          // Evento que se lanza al presionar una tecla
    } = props;

    const handleChangeVoid = () => { };
    const onKeyDownVoid = () => { };

    return (
        <Form.Group as={Col} hidden={ig_hidden || false}>
            {
                title && <Form.Label>{title}</Form.Label>
            }

            <InputGroup>
                {
                    icon && <InputLeftElement
                        pointerEvents='none'
                        color='gray.300'
                        fontSize='1.2em'
                        children={icon}
                    />
                }
                <Input
                    type={type || 'text'}
                    name={name || ''}
                    placeholder={placeholder || ''}
                    defaultValue={defaultValue || ''}
                    value={value}
                    onChange={handleChange || handleChangeVoid}
                    isReadOnly={readOnly || false}
                    isDisabled={disabled || false}
                    accept={accept || false}
                    style={styleInput || null}
                    onKeyDown={onKeyDown || onKeyDownVoid}
                />
                {
                    re_icon && <InputRightElement
                        color='gray.300'
                        children={re_icon}
                        onClick={re_onClick}
                    />
                }
            </InputGroup>
        </Form.Group>
    );
}

FormIcon.propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    readOnly: PropTypes.bool,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string,
    accept: PropTypes.string,
    icon: PropTypes.any,
    disabled: PropTypes.bool,
    styleInput: PropTypes.object,
    re_icon: PropTypes.any,
    re_onClick: PropTypes.func,
    ig_hidden: PropTypes.any,
    onKeyDown: PropTypes.func,
}

export default FormIcon