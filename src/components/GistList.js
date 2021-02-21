import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Gist from "./Gist";
import { getGistData } from "../state/actions/gistAction";

const GistList = ({ dispatch, gistPublicData }) => {
  useEffect(() => {
    dispatch(getGistData());
  }, [dispatch]);
  return (
    <ListWrapper>
      {(gistPublicData || []).map((item) => (
        <Gist key={item.id} {...item} />
      ))}
    </ListWrapper>
  );
};

const ListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
`;

const mapStateToProps = (state) => {
  return { gistPublicData: ((state || {}).gistPublicData || []).data };
};

export default connect(mapStateToProps)(GistList);
