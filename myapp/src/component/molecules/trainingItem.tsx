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
      <tr className="header">
        <th>回数</th>
        <th>時間</th>
      </tr>
      {trainingRecord
        .filter((rec) => rec.name === menu)
        .map((prev) => (
          <tr key={prev.id}>
            <td className="row">{prev.count} 回</td>
            <td>{prev.time}</td>
          </tr>
        ))}
    </table>
  );
};

export default TrainingItem;
