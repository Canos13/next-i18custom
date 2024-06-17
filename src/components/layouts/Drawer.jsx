import { useDisclosure } from "@chakra-ui/hooks";
import { useRef, Fragment } from "react";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from "@chakra-ui/react";
import ButtonIcon from "./Forms/ButtonIcon";
import { faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const DrawerComp = (props) => {
    const { title, children, searchByFilters } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const [t, i18n] = useTranslation('global');

    const handleClickSearch = () => {
        searchByFilters();
        onClose();
    }
    return (
        <Fragment>
            <ButtonIcon
                tooltip={t('layouts.drawer.btn-tt')}
                name={t('layouts.drawer.btn-name')}
                icon={faFilter}
                variant='outline-secondary'
                onClick={onOpen}
            />
            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>{title}</DrawerHeader>
                    <DrawerBody>
                        {children}  {/* Filtros de búsqueda */}
                    </DrawerBody>
                    <DrawerFooter style={{ display: 'block' }}>
                        <div className="d-grid gap-2 mt-4">
                            <ButtonIcon
                                onClick={handleClickSearch}
                                size='lg'
                                name={t('layouts.drawer.btn-search')}
                                icon={faSearch}
                                variant='outline-success'
                            />
                        </div>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </Fragment >
    );
}

export default DrawerComp;