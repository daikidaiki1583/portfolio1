import React, { FC } from 'react';
import { trainingRecord } from '../../data/training';
import './trainingItem.scss';

type Props = {
  //   id: number;
  menu: string;
};

const TrainingItem: FC<Props> = (props) => {
  const { menu } = props;

  return (
    <table>
      <thead>
        <tr className="header">
          <th>回数</th>
          <th>時間</th>
        </tr>
      </thead>
      <tbody>
        {trainingRecord
          .filter((rec) => rec.name === menu)
          .map((prev) => (
            <tr key={prev.id}>
              <td className="row">{prev.count} 回</td>
              <td>{prev.time}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default TrainingItem;
