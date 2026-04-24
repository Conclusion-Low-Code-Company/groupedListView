import { createElement, ReactElement, Fragment } from "react";

import GroupTitle from "./GroupTitle";
import ListItem from "./ListItem";

import { GroupedListViewContainerProps } from "../../typings/GroupedListViewProps";
import { LOG_PREFIX } from "../constants";

/**
 * Renders the full grouped list by iterating over the datasource items and injecting a
 * GroupTitle whenever the groupId attribute changes. Relies on the datasource being
 * pre-sorted by the groupId attribute — this component does not sort itself.
 * @param props - The widget container props provided by Mendix.
 */
export default function GroupedList(props: GroupedListViewContainerProps): ReactElement {
    // Keep track of the last known group ID
    let lastKnownGroupId = "";

    return (
        <div style={props.style} className={"glv mx-listview " + props.class} tabIndex={props.tabIndex}>
            <ul className="glv__list">
                {props.inputList.items!.map(item => {
                    // Map over the list items and render each item
                    const currentGroupId = props.groupId.get(item).value ?? "";
                    if (currentGroupId === "" ) {
                        console.warn(LOG_PREFIX, `groupId value is undefined for item ${item.id} — ensure the datasource is sorted and the groupId attribute has a value.`);
                    }

                    if (currentGroupId !== lastKnownGroupId) {
                        // If the group ID of the current item is different from the last known group ID,
                        // update the last known group ID and render a new group header and the item
                        lastKnownGroupId = currentGroupId;

                        return (
                            // Fragment is used here to keep the html semantics in place
                            <Fragment key={"group-" + item.id}>
                                <GroupTitle
                                    groupTitle={props.groupTitle}
                                    item={item}
                                    stickyGroupHeaders={props.stickyGroupHeaders}
                                />
                                <ListItem
                                    widget={props.widget}
                                    item={item}
                                    listItemClick={props.listItemClick}
                                />
                            </Fragment>
                        );
                    }
                    // If the group ID is the same as the last known group ID, just render the item
                    return (
                        <ListItem widget={props.widget} item={item} listItemClick={props.listItemClick} key={item.id} />
                    );
                })}
            </ul>
        </div>
    );
}
