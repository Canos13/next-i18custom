import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { __SERVER__ } from '../../server/vars';

const { Dragger } = Upload;

const props = {
    name: 'file',
    multiple: true,
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

const DragFile = (props) => {
    const handleChange = (info) => {
        console.log("File: ", info);
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    }
    return (
        <Dragger multiple name='file' onChange={handleChange} onDrop={e=>console.log('Dropped files', e.dataTransfer.files)}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Cargar factura (XML y PDF)</p>
            <p className="ant-upload-hint">
                Haz click o arrastra tus archivos a esta área para realizar la carga
            </p>
        </Dragger>
    );
}

export default DragFile;