'use client';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Link from 'next/link';

export default function VenueCard(props) {
    const { venue } = props;
    console.log(venue);
    

    return (
        <Link href={`/venues/${venue.id}`}  className="venue-card" >
            <img src={venue.imgSrc} alt={venue.name} draggable="false" />
            <h2>{venue.name}</h2>
            <p>${venue.price}</p>
            <p>Location: {venue.location}</p>
            
        </Link>
    )
}