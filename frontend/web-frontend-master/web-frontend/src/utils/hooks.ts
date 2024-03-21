import { useIntl, useRouteData } from "@umijs/max";
import { useEffect, useState } from "react";

export function useFullScreen() {
    const [fullscreen, setFullScreen] = useState(false);
    useEffect(() => {
        const handler = ({ matches = false }) => {
            if (matches) {
                setFullScreen(true);
            } else {
                setFullScreen(false);
            }
        };

        window.matchMedia('(display-mode: fullscreen)').addEventListener('change', handler);

        return () => window.matchMedia('(display-mode: fullscreen)').removeEventListener('change', handler);
    }, []);
    return fullscreen;
}

export function useRouteTitle() {
    const {
        route: { path },
    } = useRouteData();

    const msgId = 'menu' + path?.replaceAll('/', '.');

    const intl = useIntl();
    return { title: intl.formatMessage({ id: msgId }), path };

}