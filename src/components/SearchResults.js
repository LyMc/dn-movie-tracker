import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { UnorderedList, ListItem, Link, Progress, Text } from '@chakra-ui/react';
import { useQuery } from 'react-query';
import { buildSearchMovieUrl } from '../connectors/tmdb';
import { getYear } from '../utils';

export default function Search() {
  const { terms } = useParams();
  const { data, error, isIdle, isLoading, isError } = useQuery(
    ['search', terms],
    () => fetch(buildSearchMovieUrl(terms)).then(r => r.json()),
    { enabled: !!terms },
  );

  if (isIdle) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (isLoading) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (isError) {
    return (
      <Text>
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }
  return (
    <UnorderedList>
      {data.results.map(({ id, title, release_date }) => (
        <ListItem key={id}>
          <Link as={RouterLink} to={`/movies/${id}`}>
            <Text as="span">{title} </Text>
            <Text as="span" color="GrayText">
              {getYear(release_date)}
            </Text>
          </Link>
        </ListItem>
      ))}
    </UnorderedList>
  );
}
