import { Col, Row } from "antd";

const Filter = (props) => {
    const {items} = props;

    return(
        <Row justify='end' className='mb-2'>
            {
                items && items.map((item, index_i) => 
                    <Col key={index_i}>
                        {item}
                    </Col>
                )
            }
        </Row>
    );
}

export default Filter;