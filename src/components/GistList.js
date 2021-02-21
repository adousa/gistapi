import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Octicon from "react-octicon";
import Gist from "./Gist";
import PropTypes from "prop-types";

import { getGistData } from "../state/actions/gistAction";

const GistList = ({ dispatch, gistPublicData }) => {
  useEffect(() => {
    dispatch(getGistData());
  }, [dispatch]);
  return (
    <ListWrapper>
      {gistPublicData.length === 0 && (
        <EmptyListWrapper>
          <Octicon name="squirrel" mega />
          <span>Sorry, we couldn't find any result</span>
        </EmptyListWrapper>
      )}
      {gistPublicData.length !== 0 &&
        (gistPublicData || []).map((item) => <Gist key={item.id} {...item} />)}
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

const EmptyListWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  max-width: 800px;
  margin: auto;
  font-size: 23px;
  margin-top: 24px;
  line-height: 66px;
  color: #b1b1b1;
`;

const mapStateToProps = (state) => {
  return { gistPublicData: ((state || {}).gistPublicData || []).data };
};

GistList.propTypes = {
  dispatch: PropTypes.func,
  gistPublicData: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
};

export default connect(mapStateToProps)(GistList);
