import { DeleteForever, DownloadRounded } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import React from "react";

import { LazyLoadImage } from "react-lazy-load-image-component";
import styled from "styled-components";

import { saveAs } from "file-saver";
import { deletePost } from "../utils/imageApi";

const Card = styled.div`
  min-width: 100px;
  min-height: 100px;
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 60};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    box-shadow: 1px 2px 40px 8px ${({ theme }) => theme.black + 80};
    scale: 1.05;
  }
  &:nth-child(7n + 1) {
    grid-column: auto/span 2;
    grid-row: auto/span 2;
  }
`;

const HoverOverlay = styled.div`
  opacity: 0;
  position: absolute;
  inset: 0;
  display: flex;
  align-items: start;
  justify-content: end;
  flex-direction: column;
  gap: 20px;

  backdrop-filter: blur(2px);
  background: rgb(0, 0, 0, 0, 5);
  color: ${({ theme }) => theme.primary};
  transition: opacity 0.3s ease;
  padding: 12px;
  ${Card}:hover & {
    opacity: 1;
  }
`;

const Prompt = styled.div`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({ theme }) => theme.primary};
`;

const Author = styled.div`
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.primary};
`;

const ImageCard = ({ item }) => {
  const handleDelete = async (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!isConfirmed) {
      return;
    }
    try {
      const response = await deletePost(id);
      if (response?.success) {
        alert("Post deleted successfully!");
      } else {
        alert(response?.message || "Failed to delete the post.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while trying to delete the post.");
    }
  };
  return (
    <Card>
      <LazyLoadImage
        style={{ width: "100%", height: "100%" }}
        src={item?.photo}
      />
      <HoverOverlay>
        <Prompt>{item?.prompt}</Prompt>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Author>
            <Avatar style={{ height: "32px", width: "32px" }} />
            {item?.name}
          </Author>
          <div>
            <DownloadRounded
              onClick={() => saveAs(item?.photo, "download.jpg")}
            />
            <DeleteForever
              onClick={() => handleDelete(item?._id)}
              style={{ marginLeft: "20px" }}
            />
          </div>
        </div>
      </HoverOverlay>
    </Card>
  );
};

export default ImageCard;
