import { Badge, badgeVariants } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';



const fetchAnime = async ( id ) => {

  const data = await fetch( "https://anime-api-liart.vercel.app/anime-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify( {
      id
    } )
  } );

  return ( await data.json() );

};


const Label = ( { children } ) => <p className="label text-sm">{ children }</p>;

const page = async ( { params } ) => {

  const { id } = params;
  const animeInfo = await fetchAnime( id );

  return (
    <section className='w-full'>
      <div className="w-full flex flex-col md:flex-row gap-8">
        <div className="thumbnail w-full md:w-1/4">
          { animeInfo.image ? (
            <Image src={ animeInfo.image } width={ 700 } height={ 300 } loading='lazy' placeholder='empty' className='object-contain w-full bg-black rounded-3xl' />
          ) : (
            <Skeleton className="w-full h-[430px] rounded-3xl bg-muted" />
          ) }
        </div>
        <div className='flex flex-col flex-1 gap-7'>
          <h1 className='text-[1.4rem] leading-[2rem] md:text-[1.6rem] md:leading-[2.3rem] font-bold md:font-black'>{ animeInfo.title }</h1>
          <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="info">Info</TabsTrigger>
              <TabsTrigger value="episodes">Episodes</TabsTrigger>
            </TabsList>
            <TabsContent value="info" className="rounded-lg">
              <div className="properties w-full flex flex-col gap-4 py-5 px-2">
                <div className="genre flex gap-5 items-start">
                  <Label>Genre: </Label>
                  <div className='flex gap-2 w-full flex-wrap'>
                    { animeInfo.genres.map( ( genre, i ) => (
                      <Badge key={ i }>{ genre }</Badge>
                    ) ) }
                  </div>
                </div>
                { [
                  {
                    name: "Type",
                    value: animeInfo.type,
                    variant: "outline"
                  },
                  {
                    name: "Date",
                    value: animeInfo.releaseDate,
                    variant: "outline"
                  },
                  {
                    name: "Episodes",
                    value: animeInfo.totalEpisodes,
                    variant: "secondary"
                  },
                  {
                    name: "Status",
                    value: animeInfo.status,
                    variant: "secondary"
                  }
                ].map( ( info, i ) => (
                  <div className="type flex gap-5 items-start" key={ i }>
                    <Label>{ info.name }: </Label>
                    <div className='flex gap-2 w-full flex-wrap'>
                      <Badge variant={ info.variant }>{ info.value }</Badge>
                    </div>
                  </div>
                ) ) }
                <div className='flex gap-2 w-full flex-wrap'>
                  <Label>Other Names: </Label>
                  { animeInfo.otherName.split( "," ).map( ( name, i ) => (
                    <Badge key={ i } variant={ "secondary" }>{ name }</Badge>
                  ) ) }
                </div>
                <div className="type flex flex-col gap-3 justify-start">
                  <Label>Description: </Label>
                  <div className='flex w-full p-3 rounded-lg border-2'>
                    <p className='text-[.8rem] leading-[1.25rem]'>{ animeInfo.description }</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="episodes">
              <div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-2 py-5'>
                {
                  animeInfo.episodes.map( ( episode, i ) => (
                    <Link href={ `${ episode.url }` } target='_blank' className='rounded-md items-center p-3 px-4 bg-muted group transition-all hover:scale-105 flex justify-between text-sm' key={ episode.id }>
                      Episode { episode.number }
                      <ChevronRight className='invisible group-hover:visible h-full p-[2px] aspect-square hover:bg-background rounded-full' />
                    </Link>
                  ) )
                }
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default page;