"use client";

import Image from "next/image";
import VenueCard from "./VenueCard";

import './home.css';
import { useEffect, useState } from "react";

export default function Home() {

  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const localStorageVenues = localStorage.getItem('vv_venues') || '[]';
    
    if (localStorageVenues) {
      setVenues(JSON.parse(localStorageVenues));
    } else {
      console.log('null');
    }
  }, []);

  return (
    <div id="venues-container" style={{ paddingTop: '20px' }}>
      {venues.map(venue => <VenueCard key={venue.name} venue={venue} />)}
    </div>
  );
}
