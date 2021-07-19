import { NumberRequest, INumberResponse, IHomePageResponse } from './transport';

export const getNumber = (): Promise<INumberResponse | void> => {
  return fetch('api/data')
    .then((res: Response) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(data => JSON.parse(data) as INumberResponse)
    .catch(e => {
      console.log(e);
    });
};

export const postNumber = (request: NumberRequest): Promise<Response | void> => {
  return fetch('api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  })
    .then((res: Response) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .catch(e => {
      console.log(e);
    });
};

export const getHomePage = (): Promise<IHomePageResponse | void> => {
  return fetch('api/homePage')
    .then((res: Response) => {
      if (!res.ok) {
        throw Error(res.statusText);
      }
      return res.json();
    })
    .then(data => JSON.parse(data) as IHomePageResponse)
    .catch(e => {
      console.log(e);
    });
};
