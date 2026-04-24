# Mendix Widget XML Reference

Reference for `src/<WidgetName>.xml` widget descriptor files in Mendix pluggable widgets.

## Documentation

### Mendix 10
- [Pluggable Widgets](https://docs.mendix.com/apidocs-mxsdk/apidocs/studio-pro-10/pluggable-widgets/)
- [Property Types](https://docs.mendix.com/apidocs-mxsdk/apidocs/studio-pro-10/pluggable-widgets/pluggable-widgets-property-types/)

### Mendix 11
- [Pluggable Widgets](https://docs.mendix.com/apidocs-mxsdk/apidocs/studio-pro-11/pluggable-widgets/)
- [Property Types](https://docs.mendix.com/apidocs-mxsdk/apidocs/studio-pro-11/pluggable-widgets/pluggable-widgets-property-types/)

## Widget element

Top-level attributes on the `<widget>` element:

```xml
<widget
    id="<packagePath>.<widgetName>"
    pluginWidget="true"
    needsEntityContext="true|false"
    offlineCapable="true|false"
    supportedPlatform="Web|Native|All"
    xmlns="http://www.mendix.com/widget/1.0/"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://www.mendix.com/widget/1.0/ ../node_modules/mendix/custom_widget.xsd">
```

## Child elements (before `<properties>`)

```xml
<name>Human readable widget name</name>
<description>Short description shown in Studio Pro.</description>
<studioProCategory>Data containers</studioProCategory>
<helpUrl>https://marketplace.mendix.com/link/component/<id></helpUrl>
```

- `<studioProCategory>` — controls which toolbox category the widget appears under in Studio Pro
- `<helpUrl>` — adds an info/help icon in Studio Pro linking to the given URL; use the Marketplace page URL

## Property types

| type | Usage |
|---|---|
| `datasource` | List of objects; use `isList="true"` |
| `attribute` | Attribute on an object; use `dataSource="<key>"` to bind to a datasource |
| `widgets` | Widget slot; use `dataSource="<key>"` to make data available |
| `action` | Nanoflow/microflow/page action; use `dataSource="<key>"` for list actions |
| `boolean` | True/false toggle; use `defaultValue="true|false"` |
| `string` | Text input |
| `integer` | Integer input |
| `decimal` | Decimal input |
| `enumeration` | Dropdown with fixed options; define `<enumerationValues>` |
| `expression` | Expression editor |
| `textTemplate` | Text template with attribute tokens |
| `file` | File attribute |
| `object` | Nested object with its own properties |

## Common property attributes

```xml
<property key="myProp" type="..." required="true|false" dataSource="<key>" defaultValue="...">
    <caption>Label (max 24 chars)</caption>
    <description>Longer explanation shown below the property.</description>
</property>
```

- **`<caption>` text must be max 24 characters** — longer captions are truncated in the Studio Pro UI
- `dataSource` — binds the property to a datasource (required for `attribute`, `widgets`, `action` used on list items)
- `required` — whether the property must be configured before the widget can be used

## attributeTypes

Restrict which attribute types are selectable (used with `type="attribute"`):

```xml
<attributeTypes>
    <attributeType name="String" />
    <attributeType name="Integer" />
    <attributeType name="Boolean" />
    <attributeType name="DateTime" />
    <attributeType name="Decimal" />
    <attributeType name="Long" />
    <attributeType name="Enum" />
    <attributeType name="AutoNumber" />
</attributeTypes>
```

## Property groups

Properties are organized in `<propertyGroup>` elements — a group must contain at least one property (empty groups are not allowed):

```xml
<propertyGroup caption="Group label">
    <property .../>
</propertyGroup>
```
