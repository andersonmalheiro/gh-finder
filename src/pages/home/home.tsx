import { SearchForm } from 'components/search-form';
import { FlexColumn, FlexRow } from 'styles/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  setData,
  setUserStarredRepos,
  userSelector,
} from 'store/reducers/usersSlice';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { MapService } from 'api';
import { MapResult } from 'api/services/models/map.model';
import { LoadingIndicator } from 'components/loading-indicator';
import { EmptyIndicator } from 'components/empty-indicator';
import { UserInfoCard } from 'components/user-info-card';
import { AppButton } from 'components';
import { Grid, RepoCard, RepoGrid, StyledSection } from './home.styles';

const DEFAULT_CENTER = {
  lat: -13.7058372,
  lng: -69.6466876,
};

export const Home = () => {
  const mapService = useMemo(() => new MapService(), []);
  const dispatch = useDispatch();
  const { data, userStarredRepos, loadingRepos } = useSelector(userSelector);
  const detailsRef = useRef<HTMLDivElement>(null);
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [userPin, setUserPin] = useState<[number, number] | undefined>(
    undefined
  );
  const [formInline, setFormInline] = useState(false);

  const loadUserLocation = useCallback(
    async (place: string) => {
      setMapCenter(DEFAULT_CENTER);
      setUserPin(undefined);

      try {
        const res: MapResult[] = await mapService.fetchMapBox(place);
        if (res && res.length) {
          const [location] = res;
          const { x, y } = location;
          setMapCenter({ lat: y, lng: x });
          setUserPin([y, x]);
        }
      } catch (error) {
        setMapCenter(DEFAULT_CENTER);
        setUserPin(undefined);
      }
    },
    [mapService]
  );

  useEffect(() => {
    // if (data && detailsRef && detailsRef.current) {
    //   detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    // }

    if (data) {
      loadUserLocation(data.location);
      setFormInline(true);
    } else {
      setFormInline(false);
    }
  }, [data, loadUserLocation]);

  const clear = () => {
    dispatch(setData(undefined));
    dispatch(setUserStarredRepos([]));
  };

  return (
    <div>
      <StyledSection id="main">
        {formInline ? (
          <FlexRow gap="1em">
            <SearchForm inline={formInline} />
            {data && (
              <AppButton
                onClick={clear}
                text="Clear search"
                styling="default"
              />
            )}
          </FlexRow>
        ) : (
          <FlexColumn
            padding="12% 0"
            margin="0 auto"
            style={{ maxWidth: '400px' }}
          >
            <small>Welcome</small>
            <h1>Search for a github user to get some cool info about it</h1>
            <SearchForm inline={formInline} />
          </FlexColumn>
        )}

        {data && (
          <FlexColumn>
            <h1>User details</h1>
            <Grid>
              <UserInfoCard
                data={data}
                mapCenter={mapCenter}
                userPin={userPin}
              />

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
        )}
      </StyledSection>
    </div>
  );
};
