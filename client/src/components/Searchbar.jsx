import React from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";

const SearchBarContainer = styled.div`
  max-width: 550px;
  width: 90%;
  border: 1px solid ${({ theme }) => theme.text_secondary + 90};
  color: ${({ theme }) => theme.text_primary};
  cursor: pointer;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Searchbar = ({ search, setSearch }) => {
  return (
    <SearchBarContainer>
      <SearchOutlined />
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search with prompt or name... "
        style={{
          outline: "none",
          border: "none",
          width: "100%",
          color: "inherit",
          background: "transparent",
          fontSize: "1.2rem",
        }}
      />
    </SearchBarContainer>
  );
};

export default Searchbar;
