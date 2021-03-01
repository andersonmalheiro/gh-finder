import { SearchForm } from 'components/search-form';
import { FlexColumn, FlexRow } from 'styles/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  setData,
  setMyStarredRepos,
  setUserStarredRepos,
  userSelector,
} from 'store/reducers/usersSlice';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapService } from 'api';
import { MapResult } from 'api/services/models/map.model';
import { LoadingIndicator } from 'components/loading-indicator';
import { EmptyIndicator } from 'components/empty-indicator';
import { UserInfoCard } from 'components/user-info-card';
import { AppButton, Drawer, RepositoryList, useDrawer } from 'components';
import { FaCodeBranch } from 'react-icons/fa';
import { Repository } from 'api/services/models';
import { Grid, StyledSection, FloatingBtn } from './home.styles';

const DEFAULT_CENTER = {
  lat: -13.7058372,
  lng: -69.6466876,
};

export const Home = () => {
  const mapService = useMemo(() => new MapService(), []);
  const dispatch = useDispatch();
  const { data, loadingRepos, myStarredRepos, userStarredRepos } = useSelector(
    userSelector
  );
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

  const [drawerOpen, toggleDrawer] = useDrawer();

  const onClickRepository = (repo: Repository) => {
    console.log(repo);
    repo.selected = !repo.selected;
    if (repo.selected) {
      dispatch(setMyStarredRepos([...myStarredRepos, repo]));
    } else {
      dispatch(
        setMyStarredRepos(myStarredRepos.filter((r) => r.id !== repo.id))
      );
    }
  };

  return (
    <>
      <FloatingBtn onClick={toggleDrawer}>
        <FaCodeBranch color="#fff" size={20} />
        <span className="text">My fav repos</span>
      </FloatingBtn>
      <StyledSection id="main">
        {formInline ? (
          <FlexRow gap="1em">
            <SearchForm inline={formInline} />
            {data && (
              <AppButton
                onClick={clear}
                text="Clear search"
                styling="default"
                style={{
                  border: '1px solid #393ac5',
                  background: '#fff',
                  color: '#393ac5',
                  boxShadow: '0 3px 10px 1px #393ac521',
                }}
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
                  <RepositoryList
                    data={userStarredRepos}
                    onClickCard={onClickRepository}
                  />
                ) : (
                  <EmptyIndicator message="User doesn't have starred repos..." />
                )}
              </FlexColumn>
            </Grid>
          </FlexColumn>
        )}
      </StyledSection>

      <Drawer
        toggleDrawer={toggleDrawer}
        title="My fav repos"
        open={drawerOpen}
      >
        <RepositoryList data={myStarredRepos} />
      </Drawer>
    </>
  );
};
