import React from "react";
import styled from "styled-components";
import Button from "./Button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { getImage, savePost } from "../utils/imageApi";
import { useNavigate } from "react-router-dom";

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 6px;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;
const Desc = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;
const Actions = styled.div`
  display: flex;
  flex: 1;
  gap: 8px;
`;

const GenerateImageForm = ({
  post,
  setPost,
  setGenerateImageLoading,
  setCreatePostLoading,
  createPostLoading,
  generateImageLoading,
}) => {
  const navigate = useNavigate();
  const generateImageFn = async () => {
    setGenerateImageLoading(true);
    try {
      let data = await getImage(post.prompt);
      setPost({ ...post, photo: data });
    } catch (error) {
      console.log(error);
    } finally {
      setGenerateImageLoading(false);
    }
  };

  const createPostFn = async () => {
    try {
      setCreatePostLoading(true);
      let res = await savePost(post);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setCreatePostLoading(false);
    }
  };
  return (
    <Form>
      <Top>
        <Title>Generate Image with Prompt</Title>
        <Desc>Write your promt according to your Likings</Desc>
      </Top>
      <Body>
        <TextInput
          value={post?.name}
          handelChange={(e) => setPost({ ...post, name: e.target.value })}
          placeholder={"Enter your name.."}
          label={"Author"}
        />
        <TextInput
          placeholder={"Write a prompt for image you want.."}
          label={"Image prompt"}
          rows={8}
          textArea
          value={post?.prompt}
          handelChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
      </Body>
      <Actions>
        <Button
          text={"Generate Image"}
          leftIcon={<AutoAwesome />}
          flex
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={generateImageFn}
        />
        <Button
          text={"Post Image"}
          leftIcon={<CreateRounded />}
          type={"secondary"}
          flex
          isLoading={createPostLoading}
          isDisabled={
            post.name === "" || post.prompt === "" || post.photo === ""
          }
          onClick={createPostFn}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
