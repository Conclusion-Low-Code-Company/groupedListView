import { createElement, ReactElement } from "react";

/**
 * Renders a Bootstrap danger alert when the widget's input list datasource is undefined.
 * This typically indicates the datasource has not been configured or is still loading.
 */
export default function AlertMessage(): ReactElement {
    return <div className={"alert alert-danger"}>{"GroupedListView: Input list undefined."}</div>;
}
