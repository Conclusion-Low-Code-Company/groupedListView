import { createElement, ReactElement } from "react";
import { ListActionValue, ListWidgetValue, ObjectItem } from "mendix";

// Define the properties that the ListItem component will accept
export interface ListItemProps {
    widget?: ListWidgetValue; // Optional widget to render
    item?: ObjectItem; // Optional item to pass to the widget
    listItemClick?: ListActionValue; // Optional action to execute on item click
}

export default function ListItem({ widget, item, listItemClick }: ListItemProps): ReactElement {

    // Define the click handler function
    const clickHandler = () => {
        // Get the action associated with the item
        const actionOnObject = listItemClick!.get(item!);
        // Check if the action can be executed and is not currently executing
        if (actionOnObject.canExecute && !actionOnObject.isExecuting) {
            // Execute the action
            actionOnObject.execute();
        }
    };
    // Return the list item element
    // if the listItemClick is defined add the class "link" and attach the clickHandler
    return (
        <li className={`glv__listItem${listItemClick ? " link" : ""}`} onClick={listItemClick ? clickHandler : undefined}>
            {widget!.get(item!)}
        </li>
    );
}
