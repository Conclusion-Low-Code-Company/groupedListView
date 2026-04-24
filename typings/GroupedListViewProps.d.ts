/**
 * This file was generated from GroupedListView.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { ComponentType, CSSProperties, ReactNode } from "react";
import { ListValue, ListActionValue, ListAttributeValue, ListWidgetValue } from "mendix";

export interface GroupedListViewContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    inputList: ListValue;
    groupId: ListAttributeValue<string>;
    groupTitle: ListWidgetValue;
    widget: ListWidgetValue;
    emptyMessage?: ReactNode;
    stickyGroupHeaders: boolean;
    listItemClick?: ListActionValue;
}

export interface GroupedListViewPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    inputList: {} | { type: string } | null;
    groupId: string;
    groupTitle: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    widget: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    emptyMessage: { widgetCount: number; renderer: ComponentType<{ caption?: string }> };
    stickyGroupHeaders: boolean;
    listItemClick: {} | null;
}
