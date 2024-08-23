"use client";

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import useDebounce from '@/Hooks/useDebounce';
import { IconMovie } from '@tabler/icons-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';


const page = () => {

  const [ movies, setMovies ] = useState( [] );
  const [ input, setInput ] = useState( "" );
  const [ loading, setLoading ] = useState( true );
  const [ pageNum, setPageNum ] = useState( 1 );

  const inputValue = useDebounce( input, 500 );

  useEffect( () => {

    async function fetchMovies ( input, page ) {
      const res = await fetch( `https://yts.mx/api/v2/list_movies.json?query_term=${ input }${ page ? `&page=${ page }` : "" }` );
      return ( await res.json() );
    }

    ( async () => {

      setLoading( false );

      try {
        const body = await fetchMovies( inputValue );

        if ( body.status == "ok" ) {
          setMovies( body.data.movies );
        } else {
          console.log( body );
        }

      } catch ( e ) {
        console.log( e );
      } finally {
        setLoading( false );
      }


    } )();

  }, [ inputValue ] );


  return (
    <section className='w-full h-full min-h-screen flex flex-col items-center gap-12'>
      <Input type="text" placeholder="Search movies" className="outline-none w-full md:w-2/3" onChange={ ( e ) => setInput( e.target.value ) } />
      {
        loading ? (
          <Skeleton className={ "w-full h-full rounded-xl" } />
        ) : (
          <BentoGrid className={ "mx-auto max-w-full w-full" }>
            {
              movies.map( ( movie, id ) => (
                <BentoGridItem
                  key={ id }
                  title={ movie.title }
                  description={ movie.summary }
                  header={ <img height={ 100 } className='w-full object-cover rounded-md h-2/3 flex-[.5]' src={ movie.large_cover_image } /> }
                  icon={ <IconMovie /> }
                  className={ id % 3 == 0 ? "md:col-span-2 max-h-full border border-input overflow-hidden" : "" }>

                </BentoGridItem>
              ) )
            }
          </BentoGrid>
        )
      }
    </section>
  );
};

export default page;