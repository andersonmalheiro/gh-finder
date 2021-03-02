import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Repository } from 'api/services/models';
import { RepositoryList } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('RepositoryList', () => {
  it('should render correctly', () => {
    expect(render(<RepositoryList data={[]} showFav />)).toBeTruthy();
  });

  it('should run function on like repository', () => {
    const onClick = jest.fn();
    const data: Repository[] = [
      {
        id: 1231,
        name: 'test',
        full_name: 'test/test',
        owner: {
          avatar_url: '',
          html_url: '',
          id: 1232131,
          login: '',
        },
        private: true,
        html_url: 'adasdas',
        description: 'asdasdasdas',
        fork: true,
        url: 'string',
        homepage: '',
        language: null,
        forks_count: 3123,
        stargazers_count: 23213,
        watchers_count: 12321,
        created_at: '',
        subscribers_count: 523,
        forks: 4213,
        selected: false,
      },
    ];
    const { getByTestId } = render(
      <RepositoryList
        showFav
        onClickCard={onClick}
        data={data}
        testId="user_favs_"
      />
    );
    const likeButton = getByTestId('user_favs_test');
    fireEvent.click(likeButton);

    expect(onClick).toBeCalledTimes(1);
  });

  it('should show a empty message with no data', () => {
    const { getByText } = render(<RepositoryList data={[]} showFav />);
    expect(getByText('No data...')).toBeInTheDocument();
  });
});
