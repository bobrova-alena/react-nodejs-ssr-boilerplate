import React, { useEffect, useMemo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { NumericPanel, CenterAligner, Text } from 'src/components';
import { FETCH_HOMEPAGE, NumberRequest, POST_NUMBER } from 'src/ducks';
import { RandomService } from 'src/services';

import { getHomepage, IApplicationState, selectNumber } from '../../store';
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
  const number = useSelector(selectNumber);

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
      <CenterAligner type='Both'>
        <CenterAligner type='Horizontal'>
          <Text>Server Side rendering</Text>
        </CenterAligner>
        <NumericPanel service={memoizedService} number={number} />
      </CenterAligner>
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
