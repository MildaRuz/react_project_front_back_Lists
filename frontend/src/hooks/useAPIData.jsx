import axios from 'axios';
import { useEffect, useState } from 'react';

import { useAuthContext } from '../store/AuthCtxtProvider';

export default function useAPIData(apiUrl, initValue = []) {
  const [dataArr, setDataArr] = useState(initValue);
  const [ApiErr, setApiErr] = useState({});

  const { token } = useAuthContext();

  let configs = {};
  if (token !== '') {
    configs = {
      headers: { Authorization: token },
    };
  }

  useEffect(() => {
    axios
      .get(apiUrl, configs)
      .then((resp) => {
        console.log('Response:', resp.data);
        setDataArr(resp.data);
      })
      .catch((error) => {
        setApiErr(error);
      });
  }, [apiUrl]);

  return [dataArr, setDataArr, ApiErr];
}
