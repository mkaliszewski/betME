import { useState, useEffect } from 'react';
import type { Race, Participant, RaceWithParticipants } from '../types';

interface RaceWithParticipantsUrls {
  raceUrl: string;
  participantsUrl: string;
}

type Data = Race[] | Participant[] | Race | RaceWithParticipants;

interface UseFetch {
  data: Race[] | Participant[] | Race | RaceWithParticipants;
  isLoading: boolean;
  isError: boolean;
}

export const useFetch = ({
  url,
  urls
}: {
  url?: string;
  urls?: RaceWithParticipantsUrls;
}): UseFetch => {
  const [data, setData] = useState<Data>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchAPIData = async () => {
      if (url) {
        try {
          setIsLoading(true);
          const response = await fetch(url);
          if (response) {
            const responseData = await response.json();
            setData(responseData);
          }
          setIsLoading(false);
        } catch (e) {
          setIsError(true);
          setIsLoading(false);
        }
      } else if (urls && 'raceUrl' in urls && 'participantsUrl' in urls) {
        try {
          setIsLoading(true);
          const [racesResponse, participantsResponse] = await Promise.all([
            fetch(urls.raceUrl),
            fetch(urls.participantsUrl)
          ]);
          if (racesResponse && participantsResponse) {
            const race = await racesResponse.json();
            const participants = await participantsResponse.json();
            setData({ race, participants });
          }
          setIsLoading(false);
        } catch (e) {
          setIsError(true);
          setIsLoading(false);
        }
      }
    };

    fetchAPIData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, urls?.raceUrl, urls?.participantsUrl]);

  return { data, isLoading, isError };
};
