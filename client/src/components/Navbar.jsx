import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { AddRounded, ExploreRounded } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  height: 30px;
  background: ${({ theme }) => theme.navbar};
  color: ${({ theme }) => theme.text_primary};
  font-size: 1.4rem;
  font-weight: bold;
  padding: 14px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 10px rgb(0, 0, 0, 0.5);
  @media only screen and (max-width: 600px) {
    padding: 10px 12px;
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <Container>
      t2i.AI
      {path === "post" ? (
        <Button
          text={"Explore"}
          leftIcon={<ExploreRounded style={{ fontSize: "1.6rem" }} />}
          onClick={() => navigate("/")}
          type={"secondary"}
        />
      ) : (
        <Button
          text={"Create New Post"}
          leftIcon={<AddRounded style={{ fontSize: "1.6rem" }} />}
          onClick={() => navigate("/post")}
        />
      )}
    </Container>
  );
};

export default Navbar;
