import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import { Col, Row } from "react-bootstrap";

const SkeletonCards = (props) => {
    let { items, cols } = props;
    return (
        <Row xs={1} md={cols}>
            {
                Array.from({ length: items }).map((_, index) =>
                    <Col key={index} className='mt-4'>
                        <Box padding="6" boxShadow="lg" bg="white">
                            <SkeletonCircle size="10" />
                            <SkeletonText mt="4" noOfLines={4} spacing="4" />
                        </Box>
                    </Col>
                )
            }
        </Row>
    );
}

export default SkeletonCards;