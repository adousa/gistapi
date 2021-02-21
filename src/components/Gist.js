import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Octicon from "react-octicon";
import moment from "moment";

const Gist = ({
  comments_url,
  commits_url,
  created_at,
  description,
  files,
  forks_url,
  owner,
  updated_at,
  html_url,
}) => {
  const { avatar_url, login } = owner;
  return (
    <GistContainer>
      <GistHeader>
        <Avatar>
          <img alt={`${login} Avatar`} src={avatar_url} />
          <UserNameLabel href={html_url} target="_blank">
            {login}
          </UserNameLabel>
        </Avatar>
        <GistLinks>
          <GistLink href={commits_url} target="_blank">
            <Octicon name="mark-github" code /> Files
          </GistLink>
          <GistLink href={forks_url} target="_blank">
            <Octicon name="repo-forked" code /> Forks
          </GistLink>
          <GistLink href={comments_url} target="_blank">
            <Octicon name="comment" code /> Comments
          </GistLink>
          <GistLink>
            <Octicon name="star" code /> Stars
          </GistLink>
        </GistLinks>
      </GistHeader>
      <GistDates>
        Created at {moment(created_at).format("DD/MM/YYYY")} {"  "} Last Updated{" "}
        {moment(updated_at).format("DD/MM/YYYY")}
      </GistDates>
      <GistDescription>{description}</GistDescription>
      <FilesList>
        {Object.keys(files).map((key) => (
          <FileItem href={files[key].raw_url} target="_blank">
            <Octicon name="file-text" code /> {key}
          </FileItem>
        ))}
      </FilesList>
    </GistContainer>
  );
};

const GistHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:first-child {
    flex: 1;
  }
`;

const UserNameLabel = styled.a`
  margin-left: 9px;
`;

const GistLink = styled.a`
  margin-left: 10px;
`;

const GistLinks = styled.div``;

const GistDates = styled.span`
  margin-top: 10px;
`;

const Avatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  & > img {
    width: 40px;
    border-radius: 50%;
  }
`;

const GistContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid #ececec;
  margin-bottom: 20px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  &:first-child {
    margin-top: 10px;
  }
`;

const GistDescription = styled.div`
  margin-top: 10px;
  font-size: 17px;
`;

const FilesList = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  flex-wrap: wrap;
`;

const FileItem = styled.a`
  margin-left: 10px;
`;

Gist.propTypes = {
  comments: PropTypes.number,
  comments_url: PropTypes.string,
  commits_url: PropTypes.string,
  created_at: PropTypes.string,
  description: PropTypes.string,
  files: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string])),
  forks_url: PropTypes.string,
  git_pull_url: PropTypes.string,
  git_push_url: PropTypes.string,
  html_url: PropTypes.string,
  id: PropTypes.string,
  node_id: PropTypes.string,
  owner: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool])
  ),
  public: PropTypes.bool,
  truncated: PropTypes.bool,
  updated_at: PropTypes.string,
  url: PropTypes.string,
};

export default Gist;
