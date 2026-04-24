import { createElement, ReactElement, Fragment } from "react";

import GroupTitle from "./GroupTitle";
import ListItem from "./ListItem";

import { GroupedListViewContainerProps } from "../../typings/GroupedListViewProps";

export default function GroupedList(props: GroupedListViewContainerProps): ReactElement {
    // Keep track of the last known group ID
    let lastKnownGroupId = "";

    return (
        <div style={props.style} className={"glv mx-listview " + props.class}>
            <ul className="glv__list">
                {props.inputList.items!.map(item => {
                    // Map over the list items and render each item
                    if (props.groupId.get(item).value !== lastKnownGroupId) {
                        // If the group ID of the current item is different from the last known group ID,
                        // update the last known group ID and render a new group header and the item
                        lastKnownGroupId = props.groupId.get(item).value!;

                        return (
                            // Fragment is used here to keep the html semantics in place
                            <Fragment>
                                <GroupTitle
                                    groupTitle={props.groupTitle}
                                    item={item}
                                    stickyGroupHeaders={props.stickyGroupHeaders}
                                    key={"gt" + item.id}
                                />
                                <ListItem
                                    widget={props.widget}
                                    item={item}
                                    listItemClick={props.listItemClick}
                                    key={item.id}
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
