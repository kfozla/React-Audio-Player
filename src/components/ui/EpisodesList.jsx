import { gql, GraphQLClient } from "graphql-request";
import { useQuery } from "@tanstack/react-query";
import Episode from "./Episode";

const TEDDY_USER_ID = import.meta.env.VITE_TEDDY_USER_ID;
const TEDDY_API_KEY = import.meta.env.VITE_TEDDY_API_KEY;

const GET_PODCASTSERIES = gql`
  query getPodcastSeries($name: String!) {
    getPodcastSeries(name: $name) {
      uuid
      name
      itunesId
      description
      episodes {
        uuid
        name
        description
        datePublished
        audioUrl
        duration
      }
    }
  }
`;

const client = new GraphQLClient("https://api.taddy.org/", {
  headers: {
    "X-USER-ID": TEDDY_USER_ID,
    "X-API-KEY": TEDDY_API_KEY,
  },
});

export default function EpisodesList() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["episodes"],
    queryFn: async () => {
      const data = await client.request(GET_PODCASTSERIES, {
        name: "The Daily",
      });
      return data;
    },
    select: (data) => data.getPodcastSeries.episodes,
  });

  if (isLoading) return <div>Loading..</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log(data);

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Episodes</h1>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {data.map((episode) => (
          <Episode
            key={episode.uuid}
            className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-lg"
            episode={episode}
          ></Episode>
        ))}
      </div>
    </div>
  );
}
