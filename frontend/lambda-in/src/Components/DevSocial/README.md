<a name="DevSocial"></a>

## DevSocial(props) ⇒ <code>Component</code>
Given a Github, LinkedIn, Portfolio and/or Acclaim link, return a Material UI List component containing
a Material UI ListItem component and FontAwesomeIcon component for each link.

**Kind**: A React functional component

**Returns**: <code>Component</code> - Material UI List component.

**See**

- {@link https://material-ui.com/api/list/ } for the List API.
- {@link https://material-ui.com/api/list-item/ } for the ListItem API.
- {@link https://fontawesome.com/how-to-use/on-the-web/using-with/react } for the Font Awesome React component docs.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |
| props.github | <code>String</code> | A github profile link. |
| props.linkedIn | <code>String</code> | A linkedIn profile link. |
| props.portfolio | <code>String</code> | A link to an extrenal portfolio. |
| props.acclaim | <code>String</code> | An acclaim badge id. |