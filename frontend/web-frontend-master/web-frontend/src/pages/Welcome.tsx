import { getAllBookInformation } from '@/services/api/book';
import { getAllBookLogInformation } from '@/services/api/bookLog';
import React, { useState, useEffect } from 'react';
import { Pie, Column } from '@ant-design/plots';

export default () => {
  const [bookClassification, setbookClassification] = useState<(string | undefined)[]>([]);
  const [bookBorrowTime, setBookBorrowTime] = useState<(string)[]>([]);
  const [bookReturnTime, setBookReturnTime] = useState<(string)[]>([]);

  console.log(bookBorrowTime);
  console.log(bookClassification);

  useEffect(() => {
    const fetchData = async () => {
      const allBookData = await getAllBookInformation();
      // 此处也可以或上一个空列表解决undefined的问题
      // setbookClassification(allBookData?.map((item) => { return item.classification })||[] );
      setbookClassification(allBookData?.map((item) => { return item.classification })!);
      const allBookLogData = await getAllBookLogInformation();
      setBookBorrowTime(allBookLogData?.map((item) => { return item.borrowedTime })!);
      setBookReturnTime(allBookLogData?.map((item) => { return item.returnTime })!);
    };

    fetchData();
  }, []);

  // 使用 reduce() 方法来遍历 bookClassification 数组，对每个类型进行统计。对于每个类型，
  // 首先使用 find() 方法查找数组中是否已经存在该类型对应的对象。如果已经存在，将该对象的数量加1；
  // 否则，创建一个新对象，类型为当前类型，数量为1，并将其添加到结果数组中。
  const pieData = bookClassification.reduce((result, type) => {
    // 如果已经存在该类型，数量加1
    const item = result.find((x) => x.type === type);
    if (item) {
      item.value += 1;
    }
    // 否则创建一个新对象，数量为1
    else {
      result.push({ type: type || "", value: 1 });
    }
    return result;
    // 注意返回的格式是type，value而不是count
  }, [] as { type: string, value: number }[]);

  const borrowTime = bookBorrowTime.reduce((result, date) => {
    const item = result.find((x) => x.date === date);
    if (item) {
      item.value += 1;
    }
    else {
      result.push({ type: "借出", date: date!, value: 1 });
    }
    return result;
  }, [] as { type: string, date: string, value: number }[]);

  const returnTime = bookReturnTime.reduce((result, date) => {
    const item = result.find((x) => x.date === date);
    if (item) {
      item.value += 1;
    }
    else {
      result.push({ type: "归还", date: date!, value: 1 });
    }
    return result;
  }, [] as { type: string, date: string, value: number }[]);

  const columnData = borrowTime.concat(returnTime);

  console.log("columnData")
  console.log(columnData)

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [
      {
        type: 'pie-legend-active',
      },
      {
        type: 'element-active',
      },
    ],
  };

  const columnConfig = {
    data: columnData,
    isGroup: true,
    xField: 'date',
    yField: 'value',
    sortData: {
      field: 'date',
      order: 'asc',
    },
    seriesField: 'type',
    // 分组柱状图 组内柱子间的间距 (像素级别)
    dodgePadding: 2,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'middle', 'bottom'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },

  };
  return (
    <div>
      <Pie {...pieConfig} />
      <Column {...columnConfig} />
    </div>
  );
};
















