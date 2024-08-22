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

};


const page = async ( { params } ) => {

  const { id } = params;
  const animeInfo = await fetchAnime( id );

  return (
    <div>page</div>
  );
};

export default page;