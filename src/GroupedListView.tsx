import { ReactElement, createElement } from "react";
import AlertMessage from "./components/AlertMessage";
import EmptyMessage from "./components/EmptyMessage";
import GroupedList from "./components/GroupedList";
import { GroupedListViewContainerProps } from "../typings/GroupedListViewProps";
import { LOG_PREFIX } from "./constants";

import "./ui/GroupedListView.css";

/**
 * Entry point for the GroupedListView widget.
 * Guards against an undefined or empty datasource before rendering the grouped list.
 * @param props - The widget container props provided by Mendix.
 */
export function GroupedListView(props: GroupedListViewContainerProps): ReactElement {
    if (props.inputList.status === "loading") {
        return <div />;
    }

    if (!props.inputList.items) {
        console.warn(LOG_PREFIX, "inputList.items is undefined — check datasource configuration.");
        return <AlertMessage />;
    }

    // if the list is empty, show (custom) empty message
    if (props.inputList.items.length < 1) {
        return <EmptyMessage {...props} />;
    }
    // show the grouped list
    return <GroupedList {...props} />;
}
