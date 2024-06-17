import { faFileUpload } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import ButtonIcon from "./Forms/ButtonIcon";

const UploadFile = (props) => {
    const { handleSubmitButton, setState } = props;
    const [t, i18n] = useTranslation('global');
    
    const handleChange = (e) => {
        let { file } = e.target.files[0];
        setState({...file});
    }

    return (
        <Fragment>
            <input
                ref={handleSubmitButton}
                type="file"
                onChange={handleChange}
                style={{ display: "none" }} />
            <ButtonIcon
                icon={faFileUpload}
                name={t('layouts.upload-file.title')}
                tooltip={t('layouts.upload-file.title')}
                onClick={() => { handleSubmitButton.current.click() }}
                variant='outline-success'
            />
        </Fragment>
    );
}

export default UploadFile;