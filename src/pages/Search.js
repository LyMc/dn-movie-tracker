import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Input, IconButton, Container } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import SearchResults from '../components/SearchResults';

export default function Search() {
  const { terms } = useParams();
  const history = useHistory();
  const searchRef = React.useRef(null);

  const handleSearch = event => {
    event.preventDefault();
    const value = searchRef.current.value;
    if (value !== terms) {
      history.push(`/search/${value}`);
    }
  };

  return (
    <Container p={3}>
      <Box as="form" onSubmit={handleSearch} w="100%" d="flex" mb={3}>
        <Input placeholder="Search for a movie..." defaultValue={terms} ref={searchRef} mr={3} />
        <IconButton aria-label="Search for a movie" icon={<SearchIcon />} type="submit" />
      </Box>
      <SearchResults />
    </Container>
  );
}
