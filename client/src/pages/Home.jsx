import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Searchbar from "../components/Searchbar";
import ImageCard from "../components/ImageCard";
import { getPosts } from "../utils/imageApi";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 750px) {
    padding: 6px 10px;
  }
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Span = styled.div`
  font-size: 30px;
  font-weight: 800;
  color: ${({ theme }) => theme.secondary};

  @media (max-width: 600px) {
    font-size: 22px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapepr = styled.div`
  display: grid;
  gap: 20px;
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filterPost, setFilterPost] = useState([]);
  const [search, setSearch] = useState("");

  const fetchPost = async () => {
    try {
      let { data } = await getPosts();
      setAllPosts(data);
      setFilterPost(data.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    setFilterPost(
      allPosts.filter(
        (item) =>
          item.prompt
            .toLocaleLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1 ||
          item.name.toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) !==
            -1
      )
    );
  }, [search]);

  return (
    <Container>
      <Headline>
        Explore the polpular post from Community!
        <Span>Generated with AI</Span>
      </Headline>
      <Searchbar search={search} setSearch={setSearch} />
      <Wrapper>
        <CardWrapepr>
          {filterPost?.length > 0 ? (
            filterPost
              .reverse()
              .map((item) => <ImageCard key={item._id} item={item} />)
          ) : (
            <>Image not found!</>
          )}
        </CardWrapepr>
      </Wrapper>
    </Container>
  );
};

export default Home;
