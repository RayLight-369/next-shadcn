import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import Link from "next/link";
// import Image from "next/image";


const fetchAnime = async () => {

  const data = await fetch( "https://anime-api-liart.vercel.app/top-airing", { method: "POST" } );

  return ( await data.json() );

};

const page = async () => {

  const topAiring = await fetchAnime();

  return (
    <main className="w-full">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 justify-center md:justify-start">
        {
          topAiring?.results.map( anime => (
            <Card key={ anime.id } className={ "flex flex-col justify-between" }>
              <CardHeader>
                {/* <Image src={ anime.image } width={ 300 } height={ 150 } className="h-[300px] w-auto" /> */ }
                <div>
                  <CardTitle className={ "overflow-hidden whitespace-nowrap text-ellipsis leading-normal" }>{ anime.title }</CardTitle>
                  <CardDescription>
                    { anime.genres.join( ", " ) }
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-200">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, impedit laudantium porro quibusdam cumque iure maiores dolore nulla ex ea.</p>
              </CardContent>

              <CardFooter>
                <Button>
                  <Link href={ `/${ anime.id }` }>Go to Page</Link>
                </Button>
              </CardFooter>
            </Card>
          ) )
        }
      </div>
    </main>
  );
};

export default page;