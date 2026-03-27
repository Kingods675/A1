'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function VenueCard(props) {
    const { venue } = props;

    return (
        <div className="venue-card">
            <img src={venue.imgSrc} alt={venue.name} />
            <h1>{venue.name}</h1>

            <Tabs>
                <TabList>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                    <Tab>Three</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                    <TabPanel>
                        <p>three!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    )
}