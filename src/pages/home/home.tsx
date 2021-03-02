import { SearchForm } from 'components/search-form';
import { FlexColumn, FlexRow } from 'styles/utils';
import { useDispatch, useSelector } from 'react-redux';
import {
  setData,
  setUserStarredRepos,
  userSelector,
  likeRepo,
  dislikeRepo,
  setMyStarredRepos,
} from 'store/reducers/usersSlice';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapService } from 'api';
import { MapResult } from 'api/services/models/map.model';
import { LoadingIndicator } from 'components/loading-indicator';
import { EmptyIndicator } from 'components/empty-indicator';
import { UserInfoCard } from 'components/user-info-card';
import { AppButton, Drawer, RepositoryList, useDrawer } from 'components';
import { FaCodeBranch, FaTrash } from 'react-icons/fa';
import { Repository } from 'api/services/models';
import { Grid, StyledSection, FloatingBtn } from './home.styles';

const DEFAULT_CENTER = {
  lat: -13.7058372,
  lng: -69.6466876,
};

export const Home = () => {
  const mapService = useMemo(() => new MapService(), []);
  const dispatch = useDispatch();
  const [mapCenter, setMapCenter] = useState(DEFAULT_CENTER);
  const [formInline, setFormInline] = useState(false);
  const { data, loadingRepos, myStarredRepos, userStarredRepos } = useSelector(
    userSelector
  );
  const [userPin, setUserPin] = useState<[number, number] | undefined>(
    undefined
  );
  const [drawerOpen, toggleDrawer] = useDrawer();

  // ------ Methods ------
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

  const clear = () => {
    dispatch(setData(undefined));
    dispatch(setUserStarredRepos([]));
  };

  const onClickRepository = (repo: Repository) => {
    if (repo.selected) {
      dispatch(dislikeRepo(repo));
    } else {
      dispatch(likeRepo(repo));
    }
  };

  const removeLike = (repo: Repository) => {
    dispatch(dislikeRepo(repo));
  };
  // ------ Methods ------

  // ------ Effects ------
  useEffect(() => {
    if (data) {
      loadUserLocation(data.location);
      setFormInline(true);
    } else {
      setFormInline(false);
    }
  }, [data, loadUserLocation]);

  useEffect(() => {
    const likedRepos = localStorage.getItem('liked_repos');
    if (likedRepos) {
      const parsed = JSON.parse(likedRepos) as Array<Repository>;
      dispatch(setMyStarredRepos(parsed));
    }
  }, []);
  // ------ Effects ------

  return (
    <>
      <FloatingBtn onClick={toggleDrawer} data-testid="toggle_drawer">
        <FaCodeBranch color="#fff" size={20} />
        <span className="text">My fav repos</span>
      </FloatingBtn>
      <StyledSection id="main">
        {formInline ? (
          <FlexRow gap="1em" aligment="center">
            <SearchForm inline={formInline} />
            {data && (
              <AppButton
                data-testid="clear_search"
                onClick={clear}
                text="Clear search"
                icon={<FaTrash color="#393ac5" size={15} />}
                styling="default"
                style={{
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
                    showFav
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
        <RepositoryList
          showFav
          onClickCard={removeLike}
          data={myStarredRepos}
        />
      </Drawer>
    </>
  );
};
