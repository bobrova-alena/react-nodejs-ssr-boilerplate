import React, { useEffect, useMemo } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NumericPanel } from 'src/components';
import { FETCH_HOMEPAGE, NumberRequest, POST_NUMBER } from 'src/ducks';
import { RandomService } from 'src/services';

import { getHomepage, IApplicationState } from '../../store';
import { AppTemplate } from '../../template';

type HomePageProps = {
  data: {
    number: number;
  };
  fetchHomepage: () => void;
  //isLoading: boolean;
};

function HomePage(props: HomePageProps): JSX.Element {
  const { data, fetchHomepage } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.number === undefined) {
      fetchHomepage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoizedService = useMemo(
    () =>
      new RandomService({
        onNumberChanged: (number: number): void => {
          dispatch(POST_NUMBER(new NumberRequest(number)));
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <AppTemplate>
      <div>Home (mobile)</div>
      <NumericPanel service={memoizedService} number={data.number} />
    </AppTemplate>
  );
}

const mapStateToProps = (state: IApplicationState) => ({
  data: getHomepage(state),
  //isLoading: isLoading(state),
});
const mapDispatchToProps = { fetchHomepage: FETCH_HOMEPAGE };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage) as React.ComponentType<HomePageProps>;
