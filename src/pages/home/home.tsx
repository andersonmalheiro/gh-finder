import { SearchForm } from 'components/search-form';
import { FlexColumn, FlexRow } from 'styles/utils';
import { useSelector } from 'react-redux';
import { userSelector } from 'store/reducers/usersSlice';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { FaGithub } from 'react-icons/fa';
import { MapService } from 'api';
import { MapResult } from 'api/services/models/map.model';
import { Map } from 'components/map';
import { LoadingIndicator } from 'components/loading-indicator';
import { EmptyIndicator } from 'components/empty-indicator';
import {
  Grid,
  RepoCard,
  RepoGrid,
  StyledSection,
  UserAvatar,
  UserInfoCard,
} from './home.styles';

export const Home = () => {
  const mapService = useMemo(() => new MapService(), []);

  const { data, userStarredRepos, loadingRepos } = useSelector(userSelector);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [mapCenter, setMapCenter] = useState({
    lat: -13.7058372,
    lng: -69.6466876,
  });
  const [userPin, setUserPin] = useState<[number, number] | undefined>(
    undefined
  );

  const loadUserLocation = useCallback(
    async (place: string) => {
      try {
        const res: MapResult[] = await mapService.fetchMapBox(place);
        if (res && res.length) {
          const [location] = res;
          const { x, y } = location;
          setMapCenter({ lat: y, lng: x });
          setUserPin([y, x]);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [mapService]
  );

  useEffect(() => {
    if (data && detailsRef && detailsRef.current) {
      console.log('has details view');
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }

    if (data) {
      loadUserLocation(data.location);
    }
  }, [data, loadUserLocation]);

  return (
    <div>
      <StyledSection id="main">
        <FlexColumn
          padding="12% 0"
          margin="0 auto"
          style={{ maxWidth: '400px' }}
        >
          <small>Welcome</small>
          <h1>Search for a github user to get some cool info about it</h1>
          <SearchForm />
        </FlexColumn>
      </StyledSection>

      {data && (
        <StyledSection ref={detailsRef} id="details">
          <FlexColumn>
            <h1>User details</h1>
            <Grid>
              <UserInfoCard>
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

                <Map center={mapCenter} markerPosition={userPin} />
              </UserInfoCard>
              <FlexColumn width="100%" style={{ flex: 1 }}>
                {loadingRepos ? (
                  <LoadingIndicator />
                ) : userStarredRepos.length ? (
                  <RepoGrid>
                    {userStarredRepos.map((repo) => (
                      <RepoCard key={repo.id}>
                        <span className="title">{repo.full_name}</span>
                      </RepoCard>
                    ))}
                  </RepoGrid>
                ) : (
                  <EmptyIndicator message="User doesn't have starred repos..." />
                )}
              </FlexColumn>
            </Grid>
          </FlexColumn>
        </StyledSection>
      )}
    </div>
  );
};
