<a name="DevSnapshot"></a>

## DevSnapshot(props) ⇒ <code>Component</code>
Given a Github, LinkedIn, Portfolio and/or Acclaim link, return a Material UI List component containing
a Material UI ListItem component and FontAwesomeIcon component for each link.

**Kind**: A React functional component

**Returns**: <code>Component</code> - Material UI List component.

**See**

- {@link https://material-ui.com/api/card-content/ } for the CardContent API.
- {@link https://material-ui.com/api/divider/ } for the Divider API.
- {@link https://material-ui.com/api/typography/ } for the Typography API.
- {@link [../Avatar/ImageAvatar/ImageAvatar.md](../Avatar/ImageAvatar/ImageAvatar.md) } for the ImageAvater API.
- {@link [../Avatar/LetterAvatar.md](../Avatar/LetterAvatar.md) } for the LetterAvatar API.
- {@link [../SkillCloud/SkillCloud.md](../SkillCloud/SkillCloud.md) } for the SkillCloud API.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |
| props.github | <code>String</code> | A github profile link. |
| props.linkedIn | <code>String</code> | A linkedIn profile link. |
| props.portfolio | <code>String</code> | A link to an extrenal portfolio. |
| props.acclaim | <code>String</code> | An acclaim badge id. |