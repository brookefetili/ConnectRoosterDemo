import * as React from 'react';

const styles = require('./TitleBar.scss');

interface WindowHack extends Window {
    roosterJsVer: string;
}

export interface TitleBarProps {
    className?: string;
}

export default class TitleBar extends React.Component<TitleBarProps, {}> {
    render() {
        let className = styles.titleBar + ' ' + (this.props.className || '');
        return (
            <div className={className}>
                <div className={styles.titlePre}>
                    <span className={styles.titleText}>HR</span>
                </div>
                <div className={styles.title}>
                    <span className={styles.titleText}>web / Fake Connect</span>
                </div>
                <div className={styles.version}>{(window as WindowHack).roosterJsVer || ''}</div>
                <div className={styles.links}>

                </div>
            </div>
        );
    }
}
