import React from 'react';
import {
  Text,
  Image,
  CircularProgress,
  Center,
  Container,
  Box,
  SimpleGrid,
  Badge,
  Tooltip,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { buildImageUrl, imageFallback } from '../connectors/tmdb';
import { WATCHLIST_URL } from '../connectors/api';
import { useQuery } from 'react-query';

export default function Watchlist() {
  const { data: movies, error, isIdle, isLoading, isError } = useQuery(`${WATCHLIST_URL}`);

  if (isIdle) {
    return null;
  }
  if (isLoading) {
    return (
      <Center minH="50vh">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  if (isError) {
    return (
      <Container p={3}>
        <Text>Error fetching watchlist: {JSON.stringify(error)}</Text>
      </Container>
    );
  }

  return (
    <Container p={3} maxW="80em">
      <SimpleGrid minChildWidth={150} spacing={3}>
        {movies.map(movie => (
          <Box as={Link} to={`/movies/${movie.id}`} key={movie.id} pos="relative" noOfLines={2}>
            <Badge variant="solid" colorScheme="teal" pos="absolute" top={1} right={1}>
              {movie.vote_average}
            </Badge>
            <Tooltip label={movie.title}>
              <Image
                src={buildImageUrl(movie.poster_path, 'w300')}
                alt="Poster"
                fallbackSrc={imageFallback}
              />
            </Tooltip>
            <Text>{movie.title}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
}
