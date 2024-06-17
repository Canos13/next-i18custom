import { Form, Col } from "react-bootstrap";
import PropTypes from 'prop-types';

const FormGroupComponent = ({ title, name, value, defaultValue, type, readOnly, handleChange, placeholder }) => {

    const handleChangeVoid = () => { };

    return (
        <Form.Group as={Col}>
            <Form.Label>{title}</Form.Label>
            <Form.Control
                type={type || 'text'}
                name={name || ''}
                placeholder={placeholder || ''}
                defaultValue={defaultValue || ''}
                value={value}
                onChange={handleChange || handleChangeVoid}
                readOnly={readOnly || false}
            />
        </Form.Group>
    );
}

FormGroupComponent.propTypes = {
    title: PropTypes.string.isRequired,
    name: PropTypes.string,
    value: PropTypes.string.isRequired,
    defaultValue: PropTypes.string,
    type: PropTypes.string,
    readOnly: PropTypes.bool,
    handleChange: PropTypes.func,
    placeholder: PropTypes.string
}

export default FormGroupComponent;