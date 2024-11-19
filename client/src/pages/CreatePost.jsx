import React, { useState } from "react";
import styled from "styled-components";
import GenerateImageForm from "../components/GenerateImageForm";
import GeneratedImage from "../components/GeneratedImage";

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px 30px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  @media (max-width: 750px) {
    padding: 6px 10px;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  padding: 32px 0px;
  display: flex;
  gap: 8%;
  flex: 1;
  height: fit-content;
  justify-content: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CreatePost = () => {
  const [generateImageLoading, setGenerateImageLoading] = useState(false);
  const [createPostLoading, setCreatePostLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [post, setPost] = useState({
    name: "",
    prompt: "",
    photo: "",
  });

  return (
    <Container>
      <Wrapper>
        <GenerateImageForm
          post={post}
          setPost={setPost}
          setGenerateImageLoading={setGenerateImageLoading}
          setCreatePostLoading={setCreatePostLoading}
          createPostLoading={createPostLoading}
          generateImageLoading={generateImageLoading}
          isError={isError}
          setIsError={setIsError}
        />
        <GeneratedImage
          src={post?.photo}
          loading={generateImageLoading}
          isError={isError}
          setIsError={setIsError}
        />
      </Wrapper>
    </Container>
  );
};

export default CreatePost;
