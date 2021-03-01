import React from 'react';
import { AppButton } from 'components/button';
import { FlexColumn, FlexRow } from 'styles/utils';
import { Form } from 'components/form';
import { Input } from 'components/inputs';
import { useForm } from 'hooks';
import { useDispatch, useSelector } from 'react-redux';
import { loadData, userSelector } from 'store/reducers/usersSlice';

interface SearchFormProps {
  inline?: boolean;
}

export const SearchForm = (props: SearchFormProps = { inline: false }) => {
  const { inline } = props;
  const dispatch = useDispatch();
  const { loading } = useSelector(userSelector);

  const onSearch = () => {
    const { username } = values;
    dispatch(loadData(username));
  };

  const [handleChange, handleSubmit, values] = useForm(onSearch);

  return (
    <Form onSubmit={handleSubmit}>
      {inline ? (
        <FlexRow gap="10px">
          <Input
            id="username"
            name="username"
            type="text"
            value={values.username || ''}
            onChange={handleChange}
            placeholder="Github username..."
          />
          <AppButton
            text="Search"
            type="submit"
            styling="primary"
            disabled={!values.username}
            loading={loading}
          />
        </FlexRow>
      ) : (
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
            text="Search"
            type="submit"
            styling="primary"
            disabled={!values.username}
            loading={loading}
          />
        </FlexColumn>
      )}
    </Form>
  );
};
