'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export default function VenueCard(props) {
    const { venue } = props;

    return (
        <div className="venue-card">
            <img src={venue.imgSrc} alt={venue.name} draggable="false" />
            <h2>{venue.name}</h2>

        </div>
    )
}