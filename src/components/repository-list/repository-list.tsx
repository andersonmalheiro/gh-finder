import React from 'react';
import { Repository } from 'api/services/models';
import { MdStar } from 'react-icons/md';
import { FaCodeBranch, FaEye, FaHeart, FaRegHeart } from 'react-icons/fa';
import { FlexColumn, FlexRow } from 'styles/utils';
import { EmptyIndicator } from 'components/empty-indicator';
import { LikeButton, RepoCard, RepoGrid } from './repository-list.styles';

interface RepositoryListProps {
  data: Repository[];
  showFav: boolean;
  onClickCard?: (repo: Repository) => void;
  testId?: string;
}

export const RepositoryList = (props: RepositoryListProps) => {
  const { data, showFav, onClickCard, testId } = props;
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
                  data-testid={`${testId}title_${repo.name}`}
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
                <>
                  {repo.selected ? (
                    <LikeButton
                      data-testid={testId + repo.name}
                      onClick={onClickCard ? () => onClickCard(repo) : () => {}}
                    >
                      <FaHeart
                        title="Dislike repository"
                        color="#393ac5"
                        style={{ cursor: 'pointer' }}
                      />
                    </LikeButton>
                  ) : (
                    <LikeButton
                      data-testid={testId + repo.name}
                      onClick={onClickCard ? () => onClickCard(repo) : () => {}}
                    >
                      <FaRegHeart
                        title="Like repository"
                        color="#393ac5"
                        style={{ cursor: 'pointer' }}
                      />
                    </LikeButton>
                  )}
                </>
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
