import React, { useContext, useMemo } from 'react';
import { Table, Space, Button, Image, Upload, Popconfirm, Card } from 'antd';
import { HolderOutlined, PlusOutlined } from '@ant-design/icons';
import { DndContext } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import type {  UploadProps } from 'antd';
import type { DragEndEvent } from '@dnd-kit/core';
import type { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  key: string;
  img: string;
  start_time: string;
  update_time: string;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<HolderOutlined />}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

const Uploadprops: UploadProps = {
  maxCount: 1,
  name: 'file',
  action: '',
  headers: {},
  data: {},
  onChange(info) {
    console.log(info);
  },
};

const Popconfirmprops = {
  title: "提示",
  description: "是否确认删除当前数据？",
  onConfirm() {
    console.log('确认删除');
  }
}

const columns: ColumnsType<DataType> = [
  {
    key: 'sort',
    align: 'center',
    render: () => <DragHandle />
  },
  {
    title: '图片',
    dataIndex: 'img',
    key: 'img',
    align: "center",
    render: (text) => <Image width={100} src={text} />
  },
  {
    title: '创建时间',
    align: "center",
    dataIndex: 'start_time',
    key: 'start_time',
  },
  {
    title: '更新时间',
    align: "center",
    dataIndex: 'update_time',
    key: 'update_time',
  },
  {
    title: 'Action',
    key: 'action',
    align: "center",
    render: () => (
      <Space size="middle">
        <Upload {...Uploadprops}>
          <Button size="small" autoInsertSpace={false}>编辑</Button>
        </Upload>
        <Popconfirm {...Popconfirmprops}>
          <Button size="small" autoInsertSpace={false} danger>删除</Button>
        </Popconfirm>
      </Space>
    ),
  }
];

const initialData: DataType[] = [
  {
    key: '1',
    img: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    start_time: '2024-5-13 16:38:45',
    update_time: '2024-5-13 16:38:45',
  },
  {
    key: '2',
    img: 'https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp',
    start_time: '2024-5-13 16:38:45',
    update_time: '2024-5-13 16:38:45',
  },
  {
    key: '3',
    img: 'https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp',
    start_time: '2024-5-13 16:38:45',
    update_time: '2024-5-13 16:38:45',
  },
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

const App: React.FC = () => {
  const [dataSource, setDataSource] = React.useState<DataType[]>(initialData);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setDataSource((prevState) => {
        const activeIndex = prevState.findIndex((record) => record.key === active?.id);
        const overIndex = prevState.findIndex((record) => record.key === over?.id);
        return arrayMove(prevState, activeIndex, overIndex);
      });
    }
  };

  return (
    <Card extra={
      <Upload {...Uploadprops}>
        <Button type="primary" icon={<PlusOutlined />}>添加</Button>
      </Upload>
    }>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext items={dataSource.map((i) => i.key)} strategy={verticalListSortingStrategy}>
          <Table
            bordered
            size="middle"
            rowKey="key"
            components={{ body: { row: Row } }}
            columns={columns}
            dataSource={dataSource}
          />
        </SortableContext>
      </DndContext>
    </Card>
  );
};

export default App;
