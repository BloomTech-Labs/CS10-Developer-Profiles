<a name="SkillCloud"></a>

## SkillCloud

**Kind**: A React class component

**See**

- {@link https://reacttraining.com/react-router/web/api/Link } for the Link API.
- {@link https://material-ui.com/api/typography/ } for the Typography API.
- {@link https://material-ui.com/style/typography/ } for a demo of the Typography component.

**State**

| Name | Type | Description |
| --- | --- | --- |
| skills | <code>Array</code> | An array of objects holding all skills passed in. |


* [SkillCloud](#SkillCloud)
    * [\<SkillCloud />](#new_SkillCloud_new)
    * [.combineSkills()](#SkillCloud+combineSkills) ⇒ <code>Array</code>
    * [.render()](#SkillCloud+render) ⇒ <code>Array</code>

<a name="new_SkillCloud_new"></a>

### \<SkillCloud />
A component that generates a skill cloud using arrays of top skills, additional skills
and skills familiar with.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |
| props.topSkills | <code>Array</code> | List of seeker's top skills to be displayed in large text. |
| props.addSkills | <code>Array</code> | List of seeker's additional skills to be displayed in medium text. |
| props.familiar | <code>Array</code> | List of skills the seeker is familiar with to be displayed in small text. |

<a name="SkillCloud+combineSkills"></a>

### skillCloud.combineSkills() ⇒ <code>Array</code>
Using the passed in props topSkills, addSkills and familiar, combine the skills into an array of
objects. Each object contains the skill type, a class associated with the skill type and the skill.
Return the single skills array.

**Kind**: instance method of [<code>SkillCloud</code>](#SkillCloud)

**Returns**: <code>Array</code> - Array of objects holding top skills, additional skills and skills familiar with.
<a name="SkillCloud+render"></a>

### skillCloud.render() ⇒ <code>Array</code>
Render method.
Using the skills array stored on state, map over each skill and render a link to the /meetdev,
filtered by the selected skill.

**Kind**: instance method of [<code>SkillCloud</code>](#SkillCloud)

**Returns**: <code>HTML</code> - A div holding skill links.