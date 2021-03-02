import React from 'react';
import { Repository } from 'api/services/models';
import { MdStar } from 'react-icons/md';
import { FaCodeBranch, FaEye, FaHeart, FaRegHeart } from 'react-icons/fa';
import { FlexColumn, FlexRow } from 'styles/utils';
import { EmptyIndicator } from 'components/empty-indicator';
import { RepoCard, RepoGrid } from './repository-list.styles';

interface RepositoryListProps {
  data: Repository[];
  showFav: boolean;
  onClickCard?: (repo: Repository) => void;
}

export const RepositoryList = (props: RepositoryListProps) => {
  const { data, showFav, onClickCard } = props;
  return (
    <RepoGrid>
      {data && data?.length ? (
        data.map((repo) => (
          <RepoCard key={repo.id}>
            <FlexRow justify="space-between" width="100%">
              <FlexColumn justify="space-between">
                <a
                  style={{ textDecoration: 'none', color: '#000' }}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="title"
                >
                  {repo.full_name}
                </a>
                <FlexRow gap="1em">
                  <FlexRow aligment="center">
                    <FaCodeBranch color="#00000099" />
                    <small style={{ marginLeft: '5px', color: '#393ac5' }}>
                      {repo.forks_count}
                    </small>
                  </FlexRow>
                  <FlexRow aligment="center">
                    <MdStar color="#00000099" />
                    <small style={{ marginLeft: '5px', color: '#393ac5' }}>
                      {repo.stargazers_count}
                    </small>
                  </FlexRow>
                  <FlexRow aligment="center">
                    <FaEye color="#00000099" />
                    <small style={{ marginLeft: '5px', color: '#393ac5' }}>
                      {repo.watchers_count}
                    </small>
                  </FlexRow>
                </FlexRow>
              </FlexColumn>
              {showFav && (
                <FlexColumn>
                  {repo.selected ? (
                    <FaHeart
                      data-testid="like_button"
                      color="#f44336"
                      style={{ cursor: 'pointer' }}
                      onClick={onClickCard ? () => onClickCard(repo) : () => {}}
                    />
                  ) : (
                    <FaRegHeart
                      data-testid="like_button"
                      style={{ cursor: 'pointer' }}
                      onClick={onClickCard ? () => onClickCard(repo) : () => {}}
                    />
                  )}
                </FlexColumn>
              )}
            </FlexRow>
          </RepoCard>
        ))
      ) : (
        <EmptyIndicator message="No data..." />
      )}
    </RepoGrid>
  );
};
