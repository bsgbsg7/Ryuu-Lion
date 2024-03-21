import { Modal, notification } from 'antd';
export const openNotification = (title: string, content: string) => {
    notification.open({
        message: title,
        duration: null,
        description: content,
    });
};

export const exist = (src: string | undefined, keyword: string) => {
    if (!src) return false;
    src = src.toLowerCase();
    keyword = keyword.toLowerCase();
    return src.indexOf(keyword) >= 0;
};

export function openConfirm(title: string, callback: () => Promise<void>): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
        const modal = Modal.confirm({
            centered: true,
            title: title,
            okText: '确定',
            cancelText: '取消',
            onCancel: () => resolve(false),
            onOk: async () => {
                modal.update({
                    okButtonProps: {
                        loading: true,
                    },
                });
                try {
                    await callback();
                    resolve(true);
                } catch (ex) {
                    resolve(false);
                }
            },
        });
    })
}