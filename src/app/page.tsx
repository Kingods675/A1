'use client';

import Image from 'next/image';
import VenueCard from './VenueCard';

import './home.css';
import { useEffect, useRef, useState } from 'react';
import { Button, FormControl, Input } from '@chakra-ui/react';

export default function Home() {
  const [venues, setVenues] = useState([]);
  const [allVenues, setAllVenues] = useState([]);

  useEffect(() => {
    const localStorageVenues = localStorage.getItem('vv_venues') || '[]';

    if (localStorageVenues) {
      setVenues(JSON.parse(localStorageVenues));
      setAllVenues(JSON.parse(localStorageVenues));
    } else {
      console.log('null');
    }
  }, []);

  const searchQueryRef = useRef(null);

  const onVenueSearch = (evt: React.SubmitEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (searchQueryRef.current) {
      const searchQuery = searchQueryRef.current.value;

      if (!searchQuery) {
        alert('You need to enter something to search');
        return;
      }

      const lsVenues = localStorage.getItem('vv_venues') || '[]';
      try {
        const allVenues = JSON.parse(lsVenues);
        let filteredVenues = allVenues.filter(
          (dbVenue) =>
            dbVenue.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dbVenue.location?.toLowerCase().includes(searchQuery.toLowerCase()),
        );

        console.log('filteredVenues', filteredVenues);

        if (capacityRef.current && capacityRef.current.value) {
          filteredVenues = filteredVenues.filter(venue => venue.capacity >= Number(capacityRef.current.value))
        }

        setVenues(filteredVenues);
      } catch {}

      // reset search query after done
      searchQueryRef.current.value = '';
    }
  };

  const capacityRef = useRef(null);

  return (
    <div>
      <div className='px-50 mt-4'>
        <form onSubmit={onVenueSearch}>
          <FormControl className='flex flex-row items-center justify-center gap-2'>
            <Input
              type='text'
              name='query'
              placeholder='Search venue by name or location...'
              ref={searchQueryRef}
            />
            <Button
              // mt={4}
              // colorScheme='blue'
              type='submit'
            >
              Search
            </Button>
            <Button onClick={() => setVenues(allVenues)}>Clear</Button>
          </FormControl>
          <Input
            type='number'
            name='query'
            placeholder='Capacity'
            ref={capacityRef}
          />
        </form>
      </div>

      <div id='venues-container' className='py-8'>
        {venues.map((venue) => (
          <VenueCard key={venue.name} venue={venue} />
        ))}
      </div>
    </div>
  );
}
