<a name="DevSnapshot"></a>

## DevSnapshot(props) ⇒ <code>Component</code>
Given an object containing a seeker's name, image, location, summary, desired title, skills, return a
Material UI CardContent component containing a snapshot/preview of the seeker's profile.

**Kind**: A React functional component

**Returns**: <code>Component</code> - Material UI CardContent component with a preview of the Seeker's profile.

**See**

- {@link https://material-ui.com/api/card-content/ } for the CardContent API.
- {@link https://material-ui.com/api/divider/ } for the Divider API.
- {@link https://material-ui.com/api/typography/ } for the Typography API.
- {@link https://material-ui.com/style/typography/ } for a demo of the Typography component.
- {@link [../Avatar/ImageAvatar/README.md](../Avatar/ImageAvatar/README.md) } for the ImageAvater API.
- {@link [../Avatar/LetterAvatar/README.md](../Avatar/LetterAvatar/README.md) } for the LetterAvatar API.
- {@link [../SkillCloud/README.md](../SkillCloud/README.md) } for the SkillCloud API.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |
| props._id | <code>String</code> | MongoDB Object Id. |
| props.img | <code>String</code> | URL to seeker's profile image. |
| props.fullName | <code>String</code> | Seeker's full name. |
| props.initials | <code>String</code> | Seeker's initials using first character of first and last name. |
| props.location | <code>Object</code> | Seeker's current location. |
| props.summry | <code>String</code> | A 128 character description about the Seeker. |
| props.title | <code>String</code> | Job title the Seeker is looking for. |
| props.topSkills | <code>Array</code> | Seeker's top skills which get displayed in large text. |
| props.addSkills | <code>Array</code> | Seeker's additional skills which get displayed in medium text. |
| props.familiar | <code>Array</code> | Skills the Seeker is familiar with which get displayed in small text. |