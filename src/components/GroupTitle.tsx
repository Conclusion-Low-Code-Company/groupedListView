import { createElement, ReactElement } from "react";
import { ListWidgetValue, ObjectItem } from "mendix";

/** Properties for the GroupTitle component. */
export interface GroupTitleProps {
    groupTitle: ListWidgetValue; // Widget to render the group title
    item: ObjectItem; // Item to pass to the widget
    stickyGroupHeaders?: boolean; // Optional flag to make the group header sticky
}

/**
 * Renders the header element for a list group as an <li> item.
 * @param groupTitle - The widget slot that renders the title content; receives the first item of the group.
 * @param item - The first ObjectItem of the group, passed to the groupTitle widget slot.
 * @param stickyGroupHeaders - When true, applies sticky positioning so the header stays visible during scroll.
 */
export default function GroupTitle({ groupTitle, item, stickyGroupHeaders }: GroupTitleProps): ReactElement {
    // Return the list header element
    // Add "sticky" class if stickyGroupHeaders flag is true
    return <li className={`glv__listHeader${stickyGroupHeaders ? " glv__listHeader--sticky" : ""}`}>{groupTitle.get(item)}</li>;
}
