import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";




const fetchAnime = async () => {

  const topAiring = await fetch( "https://anime-api-liart.vercel.app/top-airing", { method: "POST" } );
  const recentEpisodes = await fetch( "https://anime-api-liart.vercel.app/recent-episodes", { method: "POST" } );

  return {
    topAiring: ( await topAiring.json() ),
    recentEpisodes: ( await recentEpisodes.json() )
  };

};



const page = async () => {

  const { topAiring } = await fetchAnime();

  return (
    <main className="w-full ">
      <div className="flex flex-col md:grid md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 items-stretch md:justify-start">
        {
          topAiring?.results.map( anime => (
            <Card key={ anime.id } className={ "relative flex flex-col max-w-full" }>
              <CardHeader className="mb-20">
                {/* <Image src={ anime.image } width={ 300 } height={ 150 } className="h-[300px] w-auto" /> */ }
                <div>
                  <Image width={ 50 } height={ 80 } src={ anime.image } className="float-left mr-4 rounded-md" />
                  <CardTitle className={ "overflow-hidden whitespace-nowrap text-ellipsis leading-normal text-xl" }>{ anime.title }</CardTitle>
                  <CardDescription>
                    { anime.genres.join( ", " ) }
                  </CardDescription>
                </div>
              </CardHeader>

              {/* <CardContent className="mb-20">
                <p className="text-sm text-slate-600 dark:text-slate-200">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, impedit laudantium porro quibusdam cumque iure maiores dolore nulla ex ea.</p>
              </CardContent> */}

              <CardFooter className="absolute bottom-0">
                {/* <Button> */ }
                <Link href={ `/${ anime.id }` } className={ buttonVariants( { variant: "default" } ) }>Go to Page</Link>
                {/* </Button> */ }
              </CardFooter>
            </Card>
          ) )
        }
      </div>
    </main>
  );
};

export default page;