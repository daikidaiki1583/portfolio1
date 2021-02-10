import React, { FC } from 'react';
import { data as dataType } from '../../type/type';
import './trainingItem.scss';

type Props = {
  record: dataType[];
  menu: string;
  handledelete: (id: number) => void;
};

const TrainingItem: FC<Props> = ({ record, menu, handledelete }) => (
  <table>
    <thead>
      <tr className="header">
        <th>セット数</th>
        <th>回数</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      {record
        .filter((rec) => rec.menu === menu)
        .map((prev, index) => (
          <tr key={prev.id}>
            <td>{index + 1}</td>
            <td className="row">{prev.count} 回</td>
            <td>
              <button type="button" onClick={() => handledelete(prev.id)}>
                削除
              </button>
            </td>
          </tr>
        ))}
    </tbody>
  </table>
);

export default TrainingItem;
