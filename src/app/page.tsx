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
        const filteredVenues = allVenues.filter((dbVenue) =>
          dbVenue.name.toLowerCase().includes(searchQuery.toLowerCase()),
        );
        setVenues(filteredVenues);
      } catch {}

      // reset search query after done
      searchQueryRef.current.value = '';
    }
  };

  return (
    <div>
      <div className='px-32'>
        <form onSubmit={onVenueSearch}>
          <FormControl className='flex flex-row items-center justify-center gap-2 mb-8'>
            <Input
              type='text'
              name='query'
              placeholder='Search venue...'
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
        </form>
      </div>

      <div id='venues-container' style={{ paddingTop: '20px' }}>
        {venues.map((venue) => (
          <VenueCard key={venue.name} venue={venue} />
        ))}
      </div>
    </div>
  );
}
