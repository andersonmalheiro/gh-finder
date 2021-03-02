import React from 'react';
import { render } from '@testing-library/react';
import { User } from 'api/services/models';
import { UserInfoCard } from '../../components';
import '@testing-library/jest-dom/extend-expect';

describe('UserInfoCard', () => {
  it('should render correctly', () => {
    const user: User = {
      login: 'andersonmalheiro',
      email: '',
      avatar_url: 'https://avatars.githubusercontent.com/u/41576677?v=4',
      gravatar_id: '',
      html_url: 'https://github.com/andersonmalheiro',
      name: 'Anderson Malheiro de Carvalho',
      company: '@Brisanet',
      blog: 'www.andersonmalheiro.com',
      location: 'Juazeiro do Norte, Ceará',
      bio:
        'Bachelor degree in Information Systems\r\n| Front-end Developer | React | Angular | Python ',
      public_repos: 42,
      public_gists: 8,
      followers: 32,
      following: 39,
    };

    const center = {
      lat: 20,
      lng: 11,
    };

    const { getByText } = render(
      <UserInfoCard data={user} mapCenter={center} />
    );
    expect(getByText('andersonmalheiro')).toBeInTheDocument();
  });
});
