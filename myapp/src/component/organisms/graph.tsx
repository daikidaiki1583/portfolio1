import React, { FC, useState, useEffect } from 'react';
import Input from '../atoms/input';
import axios from '../../axios';
import { data } from '../../type/type';

const Graph: FC = () => {
  const [start, setStart] = useState<string>('');
  const [end, setEnd] = useState<string>('');
  const [record, setRecord] = useState<data[]>([]);

  const createGraph = (): void => {
    axios
      .get(`/api/get/trainingrecord/graph/`, {
        params: {
          start,
          end,
        },
      })
      .then((response) => {
        console.log(response.data);
        setRecord(response.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.id === 'start') {
      setStart(e.target.value);
    } else {
      setEnd(e.target.value);
    }
  };

  return (
    <>
      start
      <Input id="start" type="date" value={start} handleChange={handleChange} />
      end
      <Input id="end" type="date" value={end} handleChange={handleChange} />
      <button type="button" onClick={createGraph}>
        検索
      </button>
      {record ? (
        record.map((rec) => (
          <div key={rec.id}>
            {rec.dt}
            {rec.menu}
            {rec.count}
          </div>
        ))
      ) : (
        <div>null</div>
      )}
    </>
  );
};

export default Graph;
