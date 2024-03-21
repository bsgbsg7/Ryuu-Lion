import { ScaleInfo } from '.';
import { polygon, point, inside } from "@turf/turf";

export interface DragInfo {
  processNewRect: boolean;
  dragActive: boolean;
  // 托转的矩形序号，0表示第一个矩形
  dragImageActive: boolean;
  shapeIndex: number;
  // 拖拽点的序号。左上角为1，右上角为2，左下角为3，右下角为4。0表示没有
  pointIndex: number;
  // 被拖拽前的备份数据
  backupPoints?: number[];
}
export const redraw = (
  ctx: CanvasRenderingContext2D | null,
  points: number[][],
  scaleInfo: ScaleInfo,
  dragInfo: DragInfo,
  cusorPoint: number[] | undefined,
  currentRect: number
) => {
  if (!ctx) {
    return;
  }
  if (cusorPoint) {
    cusorPoint = [
      (cusorPoint[0] - scaleInfo.left) * scaleInfo.scale,
      (cusorPoint[1] - scaleInfo.top) * scaleInfo.scale,
    ];
  }

  if (!points?.length) {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(100,150,185,0.5)';
    ctx.fillRect(0, 0, 200, 40);
    ctx.fillStyle = 'red';
    ctx.font = '14px Verdana';
    ctx.fillText("没有分割区域", 20, 20);
    return;
  }

  dragInfo.shapeIndex = -1;
  points?.forEach((item, i) => {
    // 0:x1, 1: y1,  2: x2,  3: y2
    const x1 = item[0] * scaleInfo.scale - scaleInfo.left * scaleInfo.scale;
    const y1 = item[1] * scaleInfo.scale - scaleInfo.top * scaleInfo.scale;
    const x2 = item[2] * scaleInfo.scale - scaleInfo.left * scaleInfo.scale;
    const y2 = item[3] * scaleInfo.scale - scaleInfo.top * scaleInfo.scale;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;


    if (currentRect === i) {
      ctx.fillStyle = 'rgba(100,0,0,0.5)';
    } else {
      ctx.fillStyle = 'rgba(100,150,185,0.5)';
    }

    ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
    ctx.fillStyle = '#fff';
    ctx.font = '14px Verdana';
    const text = ((x2 - x1) / (y2 - y1)).toFixed(2);
    ctx.fillText(text, x1 + 20, y1 + 30);

    ctx.rect(x1, y1, x2 - x1, y2 - y1);
    ctx.stroke();
    if (drawNodeCircle(ctx, x1, y1, 1, cusorPoint)) {
      dragInfo.shapeIndex = i;
      if (!dragInfo.dragActive) dragInfo.pointIndex = 1;
    }
    if (drawNodeCircle(ctx, x2, y1, 2, cusorPoint)) {
      dragInfo.shapeIndex = i;
      if (!dragInfo.dragActive) dragInfo.pointIndex = 2;
    }
    if (drawNodeCircle(ctx, x2, y2, 3, cusorPoint)) {
      dragInfo.shapeIndex = i;
      if (!dragInfo.dragActive) dragInfo.pointIndex = 3;
    }
    if (drawNodeCircle(ctx, x1, y2, 4, cusorPoint)) {
      dragInfo.shapeIndex = i;
      if (!dragInfo.dragActive) dragInfo.pointIndex = 4;
    }

    if (drawNodeCircle(ctx, (x1 + x2) / 2, (y1 + y2) / 2, i + 1, cusorPoint)) {
      dragInfo.shapeIndex = i;
      if (!dragInfo.dragActive) dragInfo.pointIndex = 5;
    }
  });
};

function drawNodeCircle(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  i: number,
  cusorPoint?: number[],
) {
  let mouseInNode = false;
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x, y, 7, 0, Math.PI * 2, false);
  // self._isPointInPath(t, p, i, pos);
  if (cusorPoint && ctx.isPointInPath(cusorPoint[0], cusorPoint[1])) {
    ctx.fillStyle = '#333';
    ctx.arc(x, y, 7, 0, Math.PI * 2, false);
    ctx.fill();
    mouseInNode = true;
  }
  ctx.stroke();
  ctx.fill();

  if (i > 0) {
    ctx.fillStyle = mouseInNode ? '#fff' : '#000';
    ctx.font = '12px Verdana';
    const measure = ctx.measureText('' + i);
    ctx.fillText(`${i}`, x - measure.width / 2, y + 5);
  }

  return mouseInNode;
}

export function modifyPoints(dragInfo: DragInfo, points: number[][], cursorPoint: number[]) {
  if (dragInfo.shapeIndex < 0 || dragInfo.pointIndex < 1) {
    return;
  }

  cursorPoint[0] = parseInt(cursorPoint[0].toFixed(0), 10);
  cursorPoint[1] = parseInt(cursorPoint[1].toFixed(0), 10);

  const currentRect = points[dragInfo.shapeIndex];
  const oldCenter = [
    Math.round((currentRect[0] + currentRect[2]) / 2),
    Math.round((currentRect[1] + currentRect[3]) / 2),
  ];
  switch (dragInfo.pointIndex) {
    case 1:
      // 左上角
      // if (cursorPoint[0] < currentRect[0] && cursorPoint[1] < currentRect[1]) {
      currentRect[0] = cursorPoint[0];
      currentRect[1] = cursorPoint[1];
      // }

      break;
    case 2:
      // 右上角
      currentRect[2] = cursorPoint[0];
      currentRect[1] = cursorPoint[1];
      break;
    case 3:
      // 右下角
      currentRect[2] = cursorPoint[0];
      currentRect[3] = cursorPoint[1];
      break;
    case 4:
      // 左下角
      currentRect[0] = cursorPoint[0];
      currentRect[3] = cursorPoint[1];
      break;
    case 5:
      // 中心
      const detaX = cursorPoint[0] - oldCenter[0];
      const detaY = cursorPoint[1] - oldCenter[1];
      currentRect[0] += detaX;
      currentRect[1] += detaY;
      currentRect[2] += detaX;
      currentRect[3] += detaY;
      break;
  }
}


export function ajustRect(rect: number[]) {
  let temp;
  if (rect[0] > rect[2]) {
    temp = rect[0];
    rect[0] = rect[2];
    rect[2] = temp;
  }

  if (rect[1] > rect[3]) {
    temp = rect[1];
    rect[1] = rect[3];
    rect[3] = temp;
  }
}

/**
 * 
 * @param pts 最后传递给父组件事件的参数
 * @param width 图像原始宽
 * @param height  图像原始高
 */
export function finalAjustPoints(pts: number[][], width: number, height: number) {
  if (!pts) return;
  console.log(pts);
  pts.forEach(rect => {
    let x1 = Math.min(rect[0], rect[2]);
    let y1 = Math.min(rect[1], rect[3]);
    let x2 = Math.max(rect[0], rect[2]);
    let y2 = Math.max(rect[1], rect[3]);
    const rectWidth = x2 - x1;
    const rectHeight = y2 - y1;
    if (x1 < 0) {
      x1 = 0;
      x2 = x1 + rectWidth;
    }
    if (y1 < 0) {
      y1 = 0;
      y2 = y1 + rectHeight;
    }
    if (x2 >= width - 1) {
      x2 = width - 1
      x1 = x2 - rectWidth;
    }
    if (y2 >= height - 1) {
      y2 = height - 1
      y1 = y2 - rectHeight;
    }
    if (x1 < 0) {
      x1 = 0;
    }
    if (y1 < 0) {
      y1 = 0;
    }
    rect[0] = x1;
    rect[2] = x2;
    rect[1] = y1;
    rect[3] = y2;
  })
}

export function rotatePoints(points: number[][], angel: number, width: number, height: number) {
  if (!points) return;

  points.forEach(rect => {
    const x1 = rect[0]
    const x2 = rect[2];
    const y1 = rect[1];
    const y2 = rect[3];
    if (angel === 90) {
      // 顺时针
      rect[0] = height - y1;
      rect[1] = x1;
      rect[2] = height - y2;
      rect[3] = x2;
    } else {
      // 逆时针
      rect[0] = y1;
      rect[1] = width - x1;
      rect[2] = y2;
      rect[3] = width - x2;
    }
  })
}

export function getPointIndex(point: number[], points: number[][]) {
  if (!points?.length) return -1;
  return points.findIndex(rect => {
    const [x1, y1, x2, y2] = rect;
    const p = polygon([[[x1, y1], [x2, y1], [x2, y2], [x1, y2], [x1, y1]]]);
    if (inside(point, p)) return true;
    return false;
  })
}