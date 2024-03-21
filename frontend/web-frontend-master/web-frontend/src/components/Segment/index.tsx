import React, { useRef, useCallback, useEffect, useState } from 'react';

import styles from './index.less';
import { CloseOutlined } from '@ant-design/icons';
import {
  redraw,
  DragInfo,
  modifyPoints,
  ajustRect,
  finalAjustPoints,
  getPointIndex,
} from './function';
import { Button } from 'antd';
const KEY_P = 80;
const KEY_L = 76;
const KEY_DEL = 46;

export interface ImageEditorProps {
  visible: boolean;
  imageUrl: string;
  points: number[][];
  rectsVisible: boolean;
  editable: boolean;
  onChange?: (newPoints: number[][]) => void;
  children: any;
}
export interface ScaleInfo {
  scale: number;
  left: number;
  top: number;
}
export default function Segment(props: ImageEditorProps) {
  const dragInfo = useRef<DragInfo>({
    processNewRect: false,
    shapeIndex: -1,
    pointIndex: 0,
    dragActive: false,
    dragImageActive: false,
  });
  const canvas = useRef<HTMLCanvasElement>(null);
  const image = useRef<HTMLImageElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const refPoints = useRef<number[][]>(props.points);
  const [currentRect, setCurrentRect] = useState(-1);
  // 放大倍数
  const [scaleInfo, setScaleInfo] = useState<ScaleInfo>({ scale: 0.5, left: 0, top: 0 });
  useEffect(() => {
    setScaleInfo({ scale: 0.5, left: 0, top: 0 });
    setCurrentRect(-1);
  }, [props.imageUrl]);

  const fireOnChange = useCallback((pts: number[][]) => {
    if (!props.onChange) return;
    finalAjustPoints(pts, image.current?.width!, image.current?.height!);
    props.onChange(pts);
  }, []);

  const clearCanvas = useCallback(() => {
    if (!canvas.current || !image.current) {
      return;
    }

    const ctx = canvas.current.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.current.width, canvas.current.height);
    ctx.closePath();
    try {
      ctx.drawImage(
        image.current!,
        scaleInfo.left,
        scaleInfo.top,
        canvas.current.width / scaleInfo.scale,
        canvas.current.height / scaleInfo.scale,
        0,
        0,
        canvas.current.width,
        canvas.current.height,
      );
    } catch (ex) {
      console.error(ex);
    }
  }, [scaleInfo]);

  const initScaleInfo = () => {
    if (!canvas.current || !image.current) {
      return;
    }

    const cavasWidth = canvas.current.width - 40;
    const cavasHeight = canvas.current.height - 40;

    let width = image.current.width;
    let height = image.current.height;
    // 先缩放宽度，让其放在cavas里
    let scale = cavasWidth / width;
    width = cavasWidth;
    height = height * scale;

    if (height > cavasHeight) {
      // 再缩放高度，让高度放在cavas里
      scale = cavasHeight / height;
      height = cavasHeight;
      width *= scale;
    }

    scale = width / image.current.width;

    setScaleInfo({ top: -20 / scale, left: -20 / scale, scale });
  };

  const resizeCanvas = useCallback(() => {
    if (!canvas.current || !image.current || !container.current) {
      return;
    }

    canvas.current.width = container.current.clientWidth;
    canvas.current.height = container.current.clientHeight;

    const ctx = canvas.current.getContext('2d');
    if (!ctx) {
      return;
    }

    clearCanvas();
    if (props.rectsVisible) {
      redraw(ctx, refPoints.current, scaleInfo, dragInfo.current, undefined, currentRect);
    }
  }, [props.rectsVisible, scaleInfo, currentRect]);

  useEffect(() => {
    const resize = () => {
      resizeCanvas();
      initScaleInfo();
    };

    window.addEventListener('resize', resize);

    return () => {
      window.removeEventListener('resize', resize);
    };
  }, [props.rectsVisible, scaleInfo]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (container.current?.clientHeight !== canvas.current?.clientHeight) {
        resizeCanvas();
        initScaleInfo();
      }
    }, 100);
    return () => clearInterval(timer);
  }, [props.visible]);

  const onKeyDown = useCallback(
    (evt) => {
      if (!props.editable || currentRect < 0 || currentRect >= refPoints.current.length) return;
      if (evt.keyCode === KEY_DEL || evt.keyCode === KEY_P) {
        // Delete key pressed
        refPoints.current.splice(currentRect, 1);
        resizeCanvas();
        fireOnChange(refPoints.current);
        return;
      }

      if (evt.keyCode === KEY_L) {
        // resize to 2.0
        const p = refPoints.current[currentRect];
        ajustRect(p);
        p[2] = p[0] + (p[3] - p[1]) * 2;

        resizeCanvas();
        fireOnChange(refPoints.current);
        return;
      }
    },
    [scaleInfo, currentRect, props.editable],
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onKeyDown]);

  useEffect(() => {
    if (!canvas.current) {
      return;
    }
    const ctx = canvas.current.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(
      image.current!,
      scaleInfo.left,
      scaleInfo.top,
      canvas.current.width / scaleInfo.scale,
      canvas.current.height / scaleInfo.scale,
      0,
      0,
      canvas.current.width,
      canvas.current.height,
    );
    redraw(ctx, refPoints.current, scaleInfo, { ...dragInfo.current }, undefined, currentRect);
  }, [currentRect, scaleInfo]);

  useEffect(() => {
    refPoints.current = props.points;
    resizeCanvas();
  }, [props.points, scaleInfo, props.rectsVisible]);

  // 将鼠标坐标转换为图像真实坐标
  const getMousePosition = useCallback(
    (evt) => {
      let x = evt.clientX;
      let y = evt.clientY;
      const rect = canvas.current!.getBoundingClientRect();
      x -= rect.left;
      y -= rect.top;

      x /= scaleInfo.scale;
      y /= scaleInfo.scale;
      x += scaleInfo.left;
      y += scaleInfo.top;

      return [x, y];
    },
    [scaleInfo],
  );

  const onMouseMove = useCallback(
    (evt) => {
      if (!canvas.current || !image.current) {
        return;
      }

      const cursorPoint = getMousePosition(evt);
      if (dragInfo.current.dragActive) {
        // 需要修改points坐标
        let str = '';
        for (let i = 0; i < refPoints.current.length; i++) {
          str += refPoints.current[i];
          str += ' ,';
        }
        modifyPoints(dragInfo.current, refPoints.current, cursorPoint);
        str = '';
        for (let i = 0; i < refPoints.current.length; i++) {
          str += refPoints.current[i];
          str += ' ,';
        }
      } else if (dragInfo.current.dragImageActive && dragInfo.current.backupPoints) {
        onDrag([
          cursorPoint[0] - dragInfo.current.backupPoints[0],
          cursorPoint[1] - dragInfo.current.backupPoints[1],
        ]);
      }
      if (!props.rectsVisible) {
        return;
      }
      clearCanvas();
      if (props.rectsVisible) {
        redraw(
          canvas.current.getContext('2d'),
          refPoints.current,
          scaleInfo,
          dragInfo.current,
          cursorPoint,
          currentRect,
        );
      }
    },
    [props.rectsVisible, scaleInfo, currentRect],
  );

  const onMouseDown = useCallback(
    (evt) => {
      const clickIndex = getPointIndex(getMousePosition(evt), refPoints.current);
      if (clickIndex >= 0) {
        setCurrentRect(clickIndex);
      }

      if (dragInfo.current.processNewRect && props.editable) {
        const pt = getMousePosition(evt);
        dragInfo.current.processNewRect = false;
        fireOnChange([...refPoints.current, [...pt, pt[0] + 500, pt[1] + 250]]);
        return;
      }

      if (dragInfo.current.shapeIndex < 0 || dragInfo.current.pointIndex < 1) {
        dragInfo.current.dragImageActive = true;
        dragInfo.current.backupPoints = getMousePosition(evt);
        console.dir('begin drag Image');
        return;
      }

      if (!props.rectsVisible || !props.editable) {
        return;
      }
      if (!canvas.current || !image.current) {
        return;
      }

      if (dragInfo.current.shapeIndex < 0 || dragInfo.current.pointIndex < 1) {
        dragInfo.current.dragImageActive = true;
        dragInfo.current.backupPoints = getMousePosition(evt);
        console.dir('begin drag Image');
      } else {
        console.dir(`dragInfo.current.shapeIndex=${dragInfo.current.shapeIndex}`);
        dragInfo.current.dragActive = true;
        console.dir('begin drag rect');
      }
    },
    [props.rectsVisible, scaleInfo],
  );

  const onMouseUp = useCallback(() => {
    if (!props.rectsVisible) {
      return;
    }
    if (dragInfo.current.dragActive) {
      dragInfo.current.dragActive = false;
      fireOnChange(refPoints.current);
      console.dir('end drag rect');
    } else if (dragInfo.current.dragImageActive) {
      dragInfo.current.dragImageActive = false;
      console.dir('end drag image');
    }
  }, [props.rectsVisible, scaleInfo]);

  const onDrag = (point: number[]) => {
    console.dir(point);
    let { top, left, ...rest } = scaleInfo;
    left -= point[0];
    top -= point[1];
    setScaleInfo({
      ...rest,
      top,
      left,
    });
  };

  const onWheel = (e: any) => {
    console.log('wheel');
    if (e.nativeEvent.deltaY <= 0) {
      doZoomIn();
    } else {
      doZoomOut();
    }
  };

  const onNewRect = () => {
    dragInfo.current.processNewRect = true;
  };

  useEffect(() => {
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      window.removeEventListener('onmouseup', onMouseUp);
    };
  }, [onMouseUp]);

  const doZoomIn = () => {
    // 放大
    const { scale, ...rest } = scaleInfo;
    setScaleInfo({
      ...rest,
      scale: scale + 0.1,
    });
  };
  const doZoomOut = () => {
    // 缩小
    let { scale, ...rest } = scaleInfo;
    scale -= 0.1;
    if (scale <= 0.1) {
      scale = 0.1;
    }
    setScaleInfo({
      ...rest,
      scale,
    });
  };

  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginTop: '-10px', marginBottom: 5 }}>
        <Button size="small" style={{ marginRight: 5 }} onClick={onNewRect}>
          新建区域
        </Button>
        <Button
          size="small"
          style={{ marginRight: 5 }}
          icon={<CloseOutlined />}
          disabled={currentRect === -1}
          title="删除区域"
          onClick={() => {
            refPoints.current.splice(currentRect, 1);
            resizeCanvas();
            fireOnChange(refPoints.current);
          }}
          danger
        ></Button>
        {props.children}
      </div>
      <div ref={container} className={styles.container}>
        <canvas
          className={styles.canvas}
          ref={canvas}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onWheel={onWheel}
          onMouseUp={onMouseUp}
        />
        <img
          className={styles.image}
          onLoad={() => {
            resizeCanvas();
            initScaleInfo();
          }}
          ref={image}
          src={props.imageUrl}
        />
      </div>
    </div>
  );
}
