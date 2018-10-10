<a name="InputGeolocation"></a>

## InputGeolocation
A class component constructor

**Kind**: global class  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| talkToParentState | <code>function</code> | A function to pass InputGeolocation's state to a parent component. |
| textFieldProps | <code>object</code> | Contains all props needed to be passed to <TextField /> component. |
| listItemProps | <code>object</code> | Contains all props needed to be passed to <ListItem /> component. |
| googleCallback | <code>function</code> | Optional callback to enable async mode. |


* [InputGeolocation](#InputGeolocation)
    * [new InputGeolocation()](#new_InputGeolocation_new)
    * [.handleError()](#InputGeolocation+handleError) ⇒ <code>void</code>
    * [.setClassName(type, [active])](#InputGeolocation+setClassName) ⇒ <code>string</code>
    * [.passStateToParent()](#InputGeolocation+passStateToParent) ⇒ <code>void</code>
    * [.handleChange()](#InputGeolocation+handleChange) ⇒ <code>void</code>
    * [.handleSelect()](#InputGeolocation+handleSelect) ⇒ <code>void</code>
    * [.render()](#InputGeolocation+render)

<a name="new_InputGeolocation_new"></a>

### new InputGeolocation()
A component that populates the APP's global state
with suggested places, and its coordinates, from the Google Maps API.

**Example**  
```js
How to pass textFieldProps
<TextField textFieldProps={{
   id: 'sampleTextField',
   label: 'Desired Locations',
   fullWidth: true,
   margin: 'normal',
   className: 'textField-class--name another-class--name',
   style: { background-color: niceblue, font-size: 10em },
   variant: 'outlined',
   other_props: others_needed_prop
   // DO NOT PASS `value` => Is nto neccesary, Will break this.setState() functionality
 }}
/>
```
**Example**  
```js
How to pass listItemProps
<ListItem textFieldProps={{
   className: 'list-suggestion--options',
   style: {},
 }}
/>
```
<a name="InputGeolocation+handleError"></a>

### inputGeolocation.handleError() ⇒ <code>void</code>
Console.log error with Google API and reset geo-coordinates

**Kind**: instance method of [<code>InputGeolocation</code>](#InputGeolocation)  
<a name="InputGeolocation+setClassName"></a>

### inputGeolocation.setClassName(type, [active]) ⇒ <code>string</code>
Returns a string ahich holds all the class names needed for the 'className' prop.

**Kind**: instance method of [<code>InputGeolocation</code>](#InputGeolocation)  
**Returns**: <code>string</code> - The string definig all class names passed in textFieldProps || listItemProps.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| type | <code>string</code> |  | Copmponent's role (expected: input || listItem). |
| [active] | <code>boolean</code> | <code>false</code> | Define wheter the ListItem Element is active or not. |

**Example**  
```js
return
 'class-name--1 ... class-name--n'
```
<a name="InputGeolocation+passStateToParent"></a>

### inputGeolocation.passStateToParent() ⇒ <code>void</code>
Set global APP state with geolocation

**Kind**: instance method of [<code>InputGeolocation</code>](#InputGeolocation)  
<a name="InputGeolocation+handleChange"></a>

### inputGeolocation.handleChange() ⇒ <code>void</code>
Set local-scope state with user input

**Kind**: instance method of [<code>InputGeolocation</code>](#InputGeolocation)  
<a name="InputGeolocation+handleSelect"></a>

### inputGeolocation.handleSelect() ⇒ <code>void</code>
Set local and global state with 'latitude' and 'longitud' after selecting a 'place'

**Kind**: instance method of [<code>InputGeolocation</code>](#InputGeolocation)  
<a name="InputGeolocation+render"></a>

### inputGeolocation.render()
Return a <TextField /> and a <List /> components

**Kind**: instance method of [<code>InputGeolocation</code>](#InputGeolocation)  
