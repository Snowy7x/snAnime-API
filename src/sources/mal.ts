import getVideos from "./helpers/malVideos";

export async function getAnimeByName(animeName: string): Promise<void> {
  await getVideos(animeName).then((re: any) => {
    console.log(re);
  });
}
