import React from 'react';
import { User } from 'api/services/models';
import { FlexColumn, FlexRow } from 'styles/utils';
import { FaGithub } from 'react-icons/fa';
import { Map } from 'components/map';
import { InfoCard, UserAvatar } from './user-info-card.styles';

interface UserInfoCardProps {
  data: User;
  mapCenter: {
    lat: number;
    lng: number;
  };
  userPin?: [number, number];
}

export const UserInfoCard = (props: UserInfoCardProps) => {
  const { data, mapCenter, userPin } = props;

  return (
    <InfoCard>
      <FlexRow gap="20px">
        <UserAvatar src={data.avatar_url} />
        <FlexColumn>
          <span className="name">{data?.name || '---'}</span>
          <a href={data.html_url} className="alias">
            {data?.login || '---'}
            <FaGithub />
          </a>
          <p className="bio">{data?.bio || 'No bio provided'}</p>
        </FlexColumn>
      </FlexRow>
      <FlexRow margin="10px 0 0 0">
        <div className="stats-box">
          <div className="stat">
            <small>Followers</small>
            <span>{data.followers}</span>
          </div>
          <div className="stat">
            <small>Following</small>
            <span>{data.following}</span>
          </div>
          <div className="stat">
            <small>Public repos</small>
            <span>{data.public_repos}</span>
          </div>
        </div>
      </FlexRow>

      {userPin && <Map center={mapCenter} markerPosition={userPin} />}
    </InfoCard>
  );
};
