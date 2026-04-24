import { createElement, ReactElement } from "react";
import { ListWidgetValue, ObjectItem } from "mendix";

// Define the properties that the GroupTitle component will accept
export interface GroupTitleProps {
    groupTitle?: ListWidgetValue; // Optional widget to render the group title
    item?: ObjectItem; // Optional item to pass to the widget
    stickyGroupHeaders?: boolean; // Optional flag to make the group header sticky
}

export default function GroupTitle({ groupTitle, item, stickyGroupHeaders }: GroupTitleProps): ReactElement {
    // Return the list header element
    // Add "sticky" class if stickyGroupHeaders flag is true
    return <li className={`glv__listHeader${stickyGroupHeaders ? " sticky" : ""}`}>{groupTitle!.get(item!)}</li>;
}
