<a name="FilterToggle"></a>

## FilterToggle(props) ⇒ <code>Component</code>
Given filter data and event handlers for onClick and onChange, return a togglable filter comprised
of a Material UI FormGroup component containing a Material UI Button and Switch component.

**Kind**: A React functional component

**Returns**: <code>Component</code> - Material UI FormGroup component holding a toggleable filter.

**See**

- {@link https://material-ui.com/api/button/ } for the Button API.
- {@link https://material-ui.com/api/form-control-label/ } for the FromControlLabel API.
- {@link https://material-ui.com/api/form-group/ } for the FormGroup API.
- {@link https://material-ui.com/api/switch/ } for the Switch API.
- {@link https://material-ui.com/demos/selection-controls/#switches-with-formcontrollabel } for a
demo of the Switch Component.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |
| props.filter | <code>Object</code> | Filter data. |
| props.filter.displayName | <code>String</code> | Display name for filter toggle. |
| props.filter.eleName | <code>String</code> | Name assigned to Switch component for event targetting. |
| props.filter.toggleName | <code>String</code> | Name assigned to Button component for event targetting. |
| props.isChecked | <code>Boolean</code> | True/False if Switch component is checked. |
| props.isEnabled | <code>Boolean</code> | True/False if Filter Toggle is enabled. |
| props.onCheck | <code>function</code> | Switch component on change event handler. |
| props.onEnable | <code>function</code> | Button component on click event handler. |