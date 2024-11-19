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

const CardWrapper = styled.div`
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

const Loading = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${({ theme }) => theme.text_secondary};
  text-align: center;
  margin-top: 20px;
`;

const Home = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [filterPost, setFilterPost] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const fetchPost = async () => {
    setLoading(true); // Start loading
    try {
      let { data } = await getPosts();
      setAllPosts(data);
      setFilterPost(data.reverse());
    } catch (error) {
      console.log("Error fetching posts:", error);
    } finally {
      setLoading(false); // End loading
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
  }, [search, allPosts]);

  return (
    <Container>
      <Headline>
        Explore the popular posts from Community!
        <Span>Generated with AI</Span>
      </Headline>
      <Searchbar search={search} setSearch={setSearch} />
      <Wrapper>
        {loading ? ( // Show loading indicator while fetching
          <Loading>Loading posts...</Loading>
        ) : (
          <CardWrapper>
            {filterPost?.length > 0 ? (
              filterPost
                .reverse()
                .map((item) => <ImageCard key={item._id} item={item} />)
            ) : (
              <>Image not found!</>
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
