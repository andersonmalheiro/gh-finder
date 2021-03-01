import React from 'react';
import { Repository } from 'api/services/models';
import { MdStar } from 'react-icons/md';
import { FaCodeBranch, FaEye } from 'react-icons/fa';
import { FlexColumn, FlexRow } from 'styles/utils';
import { EmptyIndicator } from 'components/empty-indicator';
import { RepoCard, RepoGrid } from './repository-list.styles';

interface RepositoryListProps {
  data: Repository[];
  onClickCard?: (repo: Repository) => void;
}

export const RepositoryList = (props: RepositoryListProps) => {
  const { data, onClickCard } = props;
  return (
    <RepoGrid>
      {data && data?.length ? (
        data.map((repo) => (
          <RepoCard
            key={repo.id}
            onClick={onClickCard ? () => onClickCard(repo) : () => {}}
          >
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
          </RepoCard>
        ))
      ) : (
        <EmptyIndicator message="No data..." />
      )}
    </RepoGrid>
  );
};
