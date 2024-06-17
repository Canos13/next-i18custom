
import { Row, Col, Select } from 'antd';
import PropTypes from 'prop-types';
import { Form } from 'react-bootstrap';

const { Option } = Select;

const FilterQuery = (props) => {
    const { selects } = props;

    return (
        <Row justify='end' className='mb-2'>
            {
                selects?.map((select, index_f) =>
                    <Col key={index_f} >
                        <Select onChange={select.handleChange} placeholder={select.placeholder} style={{ width: 180 }}>
                            <Option value={null}>Todos</Option>
                            {
                                select.items?.map((item, index_i) =>
                                    <Option key={index_i} value={item.id}>{item.name}</Option>
                                )
                            }
                        </Select>
                    </Col>
                )
            }
        </Row >
    );
}

FilterQuery.propTypes = {
    selects: PropTypes.arrayOf(
        PropTypes.shape({
            handleChange: PropTypes.func.isRequired,
            title: PropTypes.string.isRequired,
            placeholder: PropTypes.string.isRequired,
            items: PropTypes.arrayOf(
                PropTypes.exact({
                    id: PropTypes.number.isRequired,
                    name: PropTypes.string.isRequired
                })
            )
        })
    )
}

export default FilterQuery;