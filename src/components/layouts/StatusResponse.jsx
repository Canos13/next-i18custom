import { Result } from 'antd';
import { PropTypes } from 'prop-types';

const StatusResponse = (props) => {
    const { title, subTitle, extra } = props;
    return (
        <Result
            status="success"
            title={title}
            subTitle={subTitle}
            extra={extra}
        />
    );
}

StatusResponse.propTypes = {
    title: PropTypes.string,
    subTitle: PropTypes.string,
    extra: PropTypes.any
}

export default StatusResponse;