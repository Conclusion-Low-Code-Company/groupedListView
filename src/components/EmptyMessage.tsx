import { createElement, ReactElement } from "react";

import { GroupedListViewContainerProps } from "../../typings/GroupedListViewProps";

/**
 * Renders the empty state of the widget when the datasource contains no items.
 * Shows the configured emptyMessage widget slot when provided, otherwise renders nothing.
 * @param props - The widget container props provided by Mendix.
 */
export default function EmptyMessage(props: GroupedListViewContainerProps): ReactElement | null {
    if (!props.emptyMessage) {
        return null;
    } else {
        return (
            <div style={props.style} className={"glv mx-listview " + props.class} tabIndex={props.tabIndex}>
                <div className="glv_empty-message">{props.emptyMessage}</div>
            </div>
        );
    }
}
