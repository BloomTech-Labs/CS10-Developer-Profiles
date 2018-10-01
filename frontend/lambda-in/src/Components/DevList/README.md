<a name="DevList"></a>

## DevList

**Kind**: A React class component

**See**

- {@link https://material-ui.com/api/grid/ } for the Grid API.
- {@link https://material-ui.com/layout/grid/ } for a demo of the Grid component.
- {@link https://react-select.com/home } for the React Select API.
- {@link [./FilterToggle/README.md](./FilterToggle/README.md) } for the FilterToggle API.
- {@link [../Pagination/README.md](../Pagination/README.md) } for the Pagination API.

**State**

| Name | Type | Description |
| --- | --- | --- |
| pathname | <code>String</code> | The current page url pathname. |
| query | <code>String</code> | The current page url search query. |
| count | <code>Integer</code> | The total number of records being displayed. |
| pages | <code>Integer</code> | The total number of pages that should exist. |
| next | <code>Null</code> \| <code>String</code> | Link to the next page in the GET request. |
| prev | <code>Null</code> \| <code>String</code> | Link to the previous page in the GET request. |
| currentPage | <code>Integer</code> | The current page number. |
| seekers | <code>Array</code> | A list of seeker's based on the current search query. |
| sort | <code>Array</code> | Current sorting behavior. |
| desiredTitle | <code>Array</code> | Current job titles to filter by. |
| topSkills | <code>Array</code> | Current top skills to filter by. |
| addSkills | <code>Array</code> | Current additional skills to filter by. |
| familiar | <code>Array</code> | Current familiar skills to filter by. |
| acclaim | <code>Boolean</code> | True/False for Lambda Badge filter toggle. |
| acclaimSwitch | <code>Boolean</code> | True/False if Lambda Badge toggle filter is enabled. |
| github | <code>Boolean</code> | True/False for GitHub filter toggle. |
| githubSwitch | <code>Boolean</code> | True/False if GitHub toggle filter is enabled. |
| linkedIn | <code>Boolean</code> | True/False for LinkedIn filter toggle. |
| linkedInSwitch | <code>Boolean</code> | True/False if LinkedIn toggle filter is enabled. |
| portfolio | <code>Boolean</code> | True/False for Portfolio filter toggle. |
| portfolioSwitch | <code>Boolean</code> | True/False if Portfolio toggle filter is enabled. |
| resume | <code>Boolean</code> | True/False for Resume filter toggle. |
| resumeSwitch | <code>Boolean</code> | True/False if Resume toggle filter is enabled. |
| projects | <code>Boolean</code> | True/False for Project filter toggle. |
| projectsSwitch | <code>Boolean</code> | True/False if Projects toggle filter is enabled. |
| experience | <code>Boolean</code> | True/False for Experience filter toggle. |
| experienceSwitch | <code>Boolean</code> | True/False if Experience toggle filter is enabled. |
| education | <code>Boolean</code> | True/False for Education filter toggle. |
| educationSwitch | <code>Boolean</code> | True/False if Education toggle filter is enabled. |


* [DevList](#DevList)
    * [\<DevList/>](#new_DevList_new)
    * [.getFilterState()](#DevList+getFilterState) ⇒ <code>Object</code>
    * [.getPathname()](#DevList+getPathname) ⇒ <code>String</code>
    * [.getQuery()](#DevList+getQuery) ⇒ <code>String</code>
    * [.getCurrentPage()](#DevList+getCurrentPage) ⇒ <code>Integer</code>
    * [.getSeekers(query)](#DevList+getSeekers)
    * [.cleanQuery(param)](#DevList+cleanQuery) ⇒ <code>String</code>
    * [.setActiveFilters()](#DevList+setActiveFilters)
    * [.setQuery(query)](#DevList+setQuery)
    * [.handleSelect(value, name)](#DevList+handleSelect)
    * [.handleSwitch(event)](#DevList+handleSwitch)
    * [.handleSwitchEnable(event)](#DevList+handleSwitchEnable)
    * [.componentDidUpdate()](#DevList+componentDidUpdate)
    * [.componentDidMount()](#DevList+componentDidMount)
    * [.render()](#DevList+render) ⇒ <code>HTML</code>

<a name="new_DevList_new"></a>

### \<DevList/>
A component that generates the Developer List/Browse page for the application.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |


<a name="DevList+getFilterState"></a>

### devList.getFilterState() ⇒ <code>Object</code>
Return an additional state object for all filters saved on FILTERS constant.

**Kind**: instance method of [<code>DevList</code>](#DevList)

**Returns**: <code>Object</code> - Additional filter state.

**Example**
```js
{
   acclaim: true,
   acclaimSwitch: false,
   sort: []
 }
```
<a name="DevList+getPathname"></a>

### devList.getPathname() ⇒ <code>String</code>
Return the pathname of the current page.

**Kind**: instance method of [<code>DevList</code>](#DevList)

**Returns**: <code>String</code> - Current page pathname.

**Example**
```js
'/meetdev'
```
<a name="DevList+getQuery"></a>

### devList.getQuery() ⇒ <code>String</code>
Return the search query for the current page.

**Kind**: instance method of [<code>DevList</code>](#DevList)

**Returns**: <code>String</code> - Current page search query.

**Example**
```js
'page=2&desiredTitle=Front+End|Back+End'
```
<a name="DevList+getCurrentPage"></a>

### devList.getCurrentPage() ⇒ <code>Integer</code>
Determine the current page using the URL query and return it. If no page is set
on the URL, return 1.

**Kind**: instance method of [<code>DevList</code>](#DevList)

**Returns**: <code>Integer</code> - Current page number.

<a name="DevList+getSeekers"></a>

### devList.getSeekers(query)
Use the given search query, concatenated with the API seekers route, to perform a GET request for
seekers. On success, save results to state. On error redirect unauthorized users or clear the list
of seekers on state.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| query | <code>String</code> | A URL search query. |

**Example**
```js
'page=2&desiredTitle=Front+End|Back+End'
```
<a name="DevList+cleanQuery"></a>

### devList.cleanQuery(param) ⇒ <code>String</code>
Given a parameter, return the query on state with the parameter removed.

**Kind**: instance method of [<code>DevList</code>](#DevList)
**Returns**: <code>String</code> - Query string with parameter removed.

| Param | Type | Description |
| --- | --- | --- |
| param | <code>String</code> | A url search query parameter. |

**Example**
```js
'page=2&desiredTitle=Front+End|Back+End'
```
<a name="DevList+setActiveFilters"></a>

### devList.setActiveFilters()
Set the state for any filters currently set on URL.

**Kind**: instance method of [<code>DevList</code>](#DevList)
<a name="DevList+setQuery"></a>

### devList.setQuery(query)
Update the current page url with the given query.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| query | <code>String</code> | A URL search query. |

**Example**
```js
'page=2&desiredTitle=Front+End|Back+End'
```
<a name="DevList+handleSelect"></a>

### devList.handleSelect(value, name)
On Change event handler for select style filters. Given the select element name and value,
create a new query to update the page URL and update the state with the new value.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | Select element value. |
| name | <code>String</code> | Select element name. |

<a name="DevList+handleSwitch"></a>

### devList.handleSwitch(event)
On Change event handler for toggle style filters. Given the name and checked field from the
event target, create a new query to update the page URL and update the state with the new value.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Event object for change event. |

<a name="DevList+handleSwitchEnable"></a>

### devList.handleSwitchEnable(event)
On Click event handler for toggle filters enable/disable button. Given the name and the inner HTML
of the event target, create a new query to update the page URL and update the state with the new value.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Event object for change event. |

<a name="DevList+componentDidUpdate"></a>

### devList.componentDidUpdate()
Component Did Update method. On each component update, if a new search query exists, get a new list of seekers with new search query.

**Kind**: instance method of [<code>DevList</code>](#DevList)
<a name="DevList+componentDidMount"></a>

### devList.componentDidMount()
Component Did Mount method. On initial component mount, set any filters that exist in the url.

**Kind**: instance method of [<code>DevList</code>](#DevList)
<a name="DevList+render"></a>

### devList.render() ⇒ <code>HTML</code>
Render method.
Build the Developer List/Browse page including filter/sort/pagination controls and a list of seekers.

**Kind**: instance method of [<code>DevList</code>](#DevList)

**Returns**: <code>HTML</code> - A responsive grid with filters in the left column and sort, pagination links and the
list of seekers in the right column.