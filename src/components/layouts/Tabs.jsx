import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react"
import PropTypes from 'prop-types';

const TabsComp = (props) => {
    const { tablist, tabpanels, defaultIndex, onChange, size } = props;

    const onChangeLocal = () => { }

    return (
        <Tabs
            variant="soft-rounded"
            colorScheme="blue"
            size={size || 'md'}
            defaultIndex={defaultIndex || 0}
            onChange={onChange || onChangeLocal}
        >
            <TabList>
                {
                    tablist.map((tab, index) =>
                        <Tab key={index}>{tab}</Tab>
                    )
                }
            </TabList>
            <TabPanels>
                {
                    tabpanels.map((panel, index) =>
                        <TabPanel key={index}>{panel}</TabPanel>
                    )
                }
            </TabPanels>
        </Tabs>
    );
}

TabsComp.propTypes = {
    tablist: PropTypes.array.isRequired,
    tabpanels: PropTypes.array.isRequired,
    defaultIndex: PropTypes.number,
    onChange: PropTypes.func,
    size: PropTypes.string
}

export default TabsComp;