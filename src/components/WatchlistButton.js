import React from 'react';
import { IconButton, Tooltip } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { generateConfig } from '../utils';
import { WATCHLIST, WATCHLIST_URL } from '../connectors/api';
import { useMutation, useQuery, useQueryClient } from 'react-query';

export default function WatchlistButton({ movie }) {
  // this will help invalidate a query
  const queryClient = useQueryClient();

  // this query is expecting that WATCHLIST_URL api will return a true/false for current user/movieId combo
  const watchlist = useQuery(['watchlist', movie.id], () =>
    fetch(`${WATCHLIST_URL}/${movie.id}`).then(r => r.json()),
  );

  // to update watchlist, use a PATCH call to set new value, that's a toggle on current value. Check https://react-query.tanstack.com/guides/mutations for how mutations works
  const update = useMutation(() => {
    const body = {
      watchlist: watchlist.data === WATCHLIST.LISTED ? WATCHLIST.REMOVED : WATCHLIST.LISTED,
    };
    return fetch(`${WATCHLIST_URL}/${movie.id}`, generateConfig('PATCH', body))
      .then(data => {
        if (data.status >= 300) {
          throw new Error(`Fetch failed with status ${data.status}`);
        }
        return data.json();
      })
      .then(data => {
        // this will invalidate the first query, to force it to update with new data. A better aproach is to use the data we get from this API to update the first query without making another query. Here you will find how to do this https://react-query.tanstack.com/guides/updates-from-mutation-responses
        queryClient.invalidateQueries(['watchlist', movie.id]);
        return data;
      });
  });

  const isListed = movie.watchlist === WATCHLIST.LISTED; // we don't care if watchlist is REMOVED or undefined, both means it's not listed
  const label = isListed ? 'Remove from watchlist' : 'Add to watchlist';
  return (
    <Tooltip label={label}>
      <IconButton
        aria-label={label}
        icon={<StarIcon />}
        colorScheme="teal"
        variant={isListed ? 'solid' : 'outline'}
        isLoading={watchlist.isLoading || update.isLoading}
        onClick={update.mutate}
      />
    </Tooltip>
  );
}
