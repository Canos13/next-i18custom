import { Skeleton, Stack } from "@chakra-ui/react";
import PropTypes from 'prop-types';

const SkeletonStack = (props) => {
    let { rows } = props;
    return (
        <Stack>
            {
                Array.from({ length: rows }).map((_, index) =>
                    <Skeleton key={index} height="20px" />
                )
            }
        </Stack>
    );
}

SkeletonStack.propTypes = {
    rows: PropTypes.number
}

export default SkeletonStack;