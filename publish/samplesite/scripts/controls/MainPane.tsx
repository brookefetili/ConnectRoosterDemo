import * as React from 'react';
import * as ReactDom from 'react-dom';
import BuildInPluginState from './BuildInPluginState';
import Editor from './editor/Editor';
import MainPaneBase from './MainPaneBase';
import Ribbon from './ribbon/Ribbon';
import TitleBar from './titleBar/TitleBar';
import { getAllPluginArray, getPlugins } from './plugins';

const styles = require('./MainPane.scss');

class MainPane extends MainPaneBase {
    private mouseX: number;
    private editor = React.createRef<Editor>();

    constructor(props: {}) {
        super(props);

        this.state = {
            showSidePane: window.location.hash != '',
            showRibbon: true,
        };
    }

    render() {
        let plugins = getPlugins();

        return (
            <div className={styles.mainPane}>
                <TitleBar className={styles.noGrow} />

                <div className={styles.section}>
                    <div className={styles.sectionText}>
                        Consider your overall impact to the business through: Your key individual accomplishments, your results that built on the work, ideas or efforts of others, your contributions to the success of others and the resulting impact of each area. Apply a growth mindset and reflect on what you could have done differently for even greater results, consider what you learned.
                    </div>
                    <div className={styles.sectionHeader}>
                        What contributions did you make this period and what was the resulting business impact?
                    </div>
                    <div className={styles.employeeComments}>
                        Employee comments
                    </div>
                </div>

                {this.state.showRibbon && (
                    <Ribbon
                        plugin={plugins.ribbon}
                        className={styles.noGrow}
                        ref={plugins.ribbon.refCallback}
                    />
                )}

                <div className={styles.body}>
                    <Editor
                        plugins={getAllPluginArray(this.state.showSidePane)}
                        className={styles.editor}
                        ref={this.editor}
                        initState={plugins.editorOptions.getBuildInPluginState()}
                        undo={plugins.snapshot}
                    />
                </div>
            </div>
        );
    }

    resetEditorPlugin(pluginState: BuildInPluginState) {
        this.editor.current.resetEditorPlugin(pluginState);
    }

    updateFormatState() {
        getPlugins().formatState.updateFormatState();
    }

    setIsRibbonShown(isShown: boolean) {
        this.setState({
            showRibbon: isShown,
        });
    }

    private onMouseMove = (e: MouseEvent) => {
        this.sidePane.changeWidth(this.mouseX - e.pageX);
        this.mouseX = e.pageX;
    };

    private onMouseUp = (e: MouseEvent) => {
        document.removeEventListener('mousemove', this.onMouseMove, true);
        document.removeEventListener('mouseup', this.onMouseUp, true);
        document.body.style.userSelect = '';
    };
}

export function mount(parent: HTMLElement) {
    ReactDom.render(<MainPane />, parent);
}
