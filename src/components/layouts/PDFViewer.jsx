import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { useState } from "react";
import { Col, Row, Button, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import ButtonIcon from './Forms/ButtonIcon';
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import SkeletonForm from './Skeletons/Form';

const PDFViewerComp = (props) => {
    const { file } = props;
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [t, i18n] = useTranslation('global');
    const prefix = 'layouts.pdf-viewer';

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    }

    const changePage = (number) => {
        if (number <= numPages && number >= 1) setPageNumber(number);
    }

    return (
        <Container fluid>
            <Row>
                <Col>
                    <Document
                        file={file}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<SkeletonForm cols={1} rows={3}/>}
                        // loading={t(`${prefix}.loading`)}
                        noData={t(`${prefix}.no-data`)}
                        error={t(`${prefix}.error`)}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ButtonIcon name={t(`${prefix}.prev`)} variant='outline-primary' icon={faAngleDoubleLeft} onClick={() => changePage(pageNumber - 1)}/>
                </Col>
                <Col><p>{t(`${prefix}.page`)} {pageNumber} {t(`${prefix}.of`)} {numPages}</p></Col>
                <Col>
                    <ButtonIcon name={t(`${prefix}.next`)} variant='outline-primary' icon={faAngleDoubleRight} onClick={() => changePage(pageNumber + 1)}/>
                </Col>
            </Row>
        </Container>
    );
}

export default PDFViewerComp;