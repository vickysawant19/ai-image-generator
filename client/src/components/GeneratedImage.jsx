import { CircularProgress } from "@mui/material";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  gap: 10px;
  padding: 16px;
  border: 2px dashed ${({ theme }) => theme.yellow};
  color: ${({ theme }) => theme.arrow + 80};
  border-radius: 20px;
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  border-radius: 20px;
  background: ${({ theme }) => theme.black};
`;
const GeneratedImage = ({ src, loading, setIsError, isError }) => {
  return (
    <Container>
      {loading ? (
        <>
          <CircularProgress
            style={{ color: "inherit", width: "24px", height: "24px" }}
          />
          Generating your Image...
        </>
      ) : src ? (
        <Image src={src} />
      ) : isError ? (
        <>Error generating Image.Please Try Again...</>
      ) : (
        <>Write a Prompt to Genetrate Image</>
      )}
    </Container>
  );
};

export default GeneratedImage;
