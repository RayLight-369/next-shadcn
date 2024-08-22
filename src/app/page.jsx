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
      <div className="flex flex-col md:grid md:grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 items-stretch md:justify-start">
        {
          topAiring?.results.map( anime => (
            <Card key={ anime.id } className={ "relative flex flex-col max-w-full" }>
              <CardHeader className="mb-20">
                {/* <Image src={ anime.image } width={ 300 } height={ 150 } className="h-[300px] w-auto" /> */ }
                <div>
                  <CardTitle className={ "overflow-hidden whitespace-nowrap text-ellipsis leading-normal" }>{ anime.title }</CardTitle>
                  <CardDescription>
                    { anime.genres.join( ", " ) }
                  </CardDescription>
                </div>
              </CardHeader>

              {/* <CardContent className="mb-20">
                <p className="text-sm text-slate-600 dark:text-slate-200">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquam, impedit laudantium porro quibusdam cumque iure maiores dolore nulla ex ea.</p>
              </CardContent> */}

              <CardFooter className="absolute bottom-0">
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