import { createElement, ReactElement, useCallback } from "react";
import { ListActionValue, ListWidgetValue, ObjectItem } from "mendix";

/** Properties for the ListItem component. */
export interface ListItemProps {
    widget: ListWidgetValue; // Widget to render
    item: ObjectItem; // Item to pass to the widget
    listItemClick?: ListActionValue; // Optional action to execute on item click
}

/**
 * Renders a single list item as an <li> element.
 * When listItemClick is configured, the item becomes interactive with a pointer cursor.
 * @param widget - The widget slot that renders the item content.
 * @param item - The ObjectItem passed to the widget slot.
 * @param listItemClick - Optional Mendix action executed when the item is clicked.
 */
export default function ListItem({ widget, item, listItemClick }: ListItemProps): ReactElement {
    // Define the click handler function, memoized to avoid unnecessary recreation on re-renders
    const clickHandler = useCallback(() => {
        // Get the action associated with the item
        const actionOnObject = listItemClick!.get(item);
        // Check if the action can be executed and is not currently executing
        if (actionOnObject.canExecute && !actionOnObject.isExecuting) {
            // Execute the action
            actionOnObject.execute();
        }
    }, [listItemClick, item]);
    // Return the list item element
    // if the listItemClick is defined add the class "link" and attach the clickHandler
    return (
        <li
            className={`glv__listItem${listItemClick ? " glv__listItem--link" : ""}`}
            onClick={listItemClick ? clickHandler : undefined}
        >
            {widget.get(item)}
        </li>
    );
}
