import { Skeleton } from "antd";
import { Form, Row, Col } from "react-bootstrap";
import PropTypes from 'prop-types';

const SkeletonForm = (props) => {
    const { cols, rows } = props;

    return (
        <Form>
            {
                Array.from({ length: rows }).map((_row, i_row) =>
                    <Row key={i_row} className='mt-4'>
                        {
                            Array.from({ length: cols }).map((_col, i_col) =>
                                <Form.Group as={Col} key={i_col}>
                                    <Skeleton.Input as={Row} style={{ width: `${60 / cols}em` }} active={true} />
                                    <Skeleton.Input as={Row} style={{ width: `${60 / cols}em` }} active={true} className='mt-1' />
                                </Form.Group>
                            )
                        }
                    </Row>
                )
            }
        </Form>
    );
}

SkeletonForm.propTypes = {
    cols: PropTypes.number.isRequired,
    rows: PropTypes.number.isRequired
}

export default SkeletonForm;