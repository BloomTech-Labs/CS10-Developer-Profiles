<a name="DevProfileCard"></a>

## DevProfileCard(props) ⇒ <code>Component</code>
Given an object containing a seeker's name, image, location, summary, desired title, skills, portfolio,
resume and social links, return a Material UI Card component with a DevSnapshot and DevSocial component.

**Kind**: A React functional component

**Returns**: <code>Component</code> - Material UI Card component containing a DevSnapshot and DevSocial component.

**See**

- {@link https://material-ui.com/api/card/ } for the Card API.
- {@link https://material-ui.com/demos/cards/ } for a demo of the Card Component.
- {@link [../../DevSnapshot/README.md](../../DevSnapshot/README.md) } for the DevSnapshot API.
- {@link [../../DevSocial/README.md](../../DevSocial/README.md) } for the DevSocial API.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |
| props.seeker | <code>Object</code> | Seeker data. |
| props.seeker._id | <code>String</code> | MongoDB Object Id. |
| props.seeker.img | <code>String</code> | URL to Seeker's profile image. |
| props.seeker.firstName | <code>String</code> | Seeker's first name. |
| props.seeker.lastName | <code>String</code> | Seeker's last name. |
| props.seeker.currentLocation | <code>Object</code> | Seeker's current location. |
| props.seeker.summary | <code>String</code> | A 128 character description about the Seeker. |
| props.seeker.desiredTitle | <code>String</code> | Job title the Seeker is looking for. |
| props.seeker.topSkills | <code>Array</code> | Seeker's top skills which get displayed in large text. |
| props.seeker.additionalSkills | <code>Array</code> | Seeker's additional skills which get displayed in medium text. |
| props.seeker.familiarWith | <code>Array</code> | Skills the Seeker is familiar with which get displayed in small text. |
| props.seeker.github | <code>String</code> | URL to Seeker's GitHub profile. |
| props.seeker.linkedIn | <code>String</code> | URL to Seeker's LinkedIn profile. |
| props.seeker.portfolio | <code>String</code> | URL to Seeker's portfolio. |
| props.seeker.resume | <code>String</code> | URL to Seeker's resume. |
| props.seeker.acclaim | <code>String</code> | Id for Lambda Badge, if issued. |