import React from 'react';
import { AppButton } from 'components/button';
import { FlexColumn } from 'styles/utils';
import { Form } from 'components/form';
import { Input } from 'components/inputs';
import { useForm } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, userSelector } from 'store/reducers/usersSlice';

export const SearchForm = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector);

  const onSearch = () => {
    const { username } = values;
    dispatch(loadData(username));
  };

  const [handleChange, handleSubmit, values] = useForm(onSearch);

  return (
    <Form onSubmit={handleSubmit}>
      <FlexColumn gap="1.5em">
        <Input
          id="username"
          name="username"
          type="text"
          value={values.username || ''}
          onChange={handleChange}
          placeholder="Github username..."
        />
        <AppButton
          text={'Search'}
          type="submit"
          styling="primary"
          disabled={!values.username}
          loading={loading}
        />
      </FlexColumn>
    </Form>
  );
};
