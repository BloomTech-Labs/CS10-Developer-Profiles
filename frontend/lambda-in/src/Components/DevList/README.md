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
    * _instance_
        * [componentDidMount()](#DevList+componentDidMount)
        * [componentDidUpdate()](#DevList+componentDidUpdate)
        * [getSeekers(query)](#DevList+getSeekers)
        * [setActiveFilters()](#DevList+setActiveFilters)
        * [setQuery(query)](#DevList+setQuery)
        * [setGeoNearQuery(miles, location, lat, lng)](#DevList+setGeoNearQuery)
        * [cleanQuery(param)](#DevList+cleanQuery) ⇒ <code>String</code>
        * [handleGeoNearSelect(location, locationLat, locationLng)](#DevList+handleGeoNearSelect)
        * [handleLocationSelect(place, placeLat, placeLng)](#DevList+handleLocationSelect)
        * [handleInput(event)](#DevList+handleInput)
        * [handleSelect(value, name)](#DevList+handleSelect)
        * [handleSwitch(event)](#DevList+handleSwitch)
        * [handleSwitchEnable(event)](#DevList+handleSwitchEnable)
        * [render()](#DevList+render) ⇒ <code>HTML</code>
    * _static_
        * [getFilterState()](#DevList.getFilterState) ⇒ <code>Object</code>
        * [getPathname()](#DevList.getPathname) ⇒ <code>String</code>
        * [getQuery()](#DevList.getQuery) ⇒ <code>String</code>
        * [getCurrentPage()](#DevList.getCurrentPage) ⇒ <code>Integer</code>

<a name="new_DevList_new"></a>

### \<DevList/>
A component that generates the Developer List/Browse page for the application.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |

<a name="DevList+componentDidMount"></a>

### componentDidMount()
Component Did Mount method. On initial component mount, set any filters that exist in the url.

**Kind**: instance method of [<code>DevList</code>](#DevList)

<a name="DevList+componentDidUpdate"></a>

### componentDidUpdate()
Component Did Update method. On each component update, if a new search query exists, get a new list of seekers with new search query.

**Kind**: instance method of [<code>DevList</code>](#DevList)

<a name="DevList+getSeekers"></a>

### getSeekers(query)
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

<a name="DevList+setActiveFilters"></a>

### setActiveFilters()
Set the state for any filters currently set on URL.

**Kind**: instance method of [<code>DevList</code>](#DevList)

<a name="DevList+setQuery"></a>

### setQuery(query)
Update the current page url with the given query.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| query | <code>String</code> | A URL search query. |

**Example**
```js
'page=2&desiredTitle=Front+End|Back+End'
```

<a name="DevList+setGeoNearQuery"></a>

### setGeoNearQuery(miles, location, lat, lng)
Given miles, a location, latitude, and longitude, create a new query to search for records
within the given distance of the given location. If miles or location are not set, ensure the
location parameter is not included in the new query.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| miles | <code>String</code> | Max distance from location to include in search. |
| location | <code>String</code> | Location to search for. |
| lat | <code>String</code> | Latitude coordinate for location |
| lng | <code>String</code> | Longitude coordinate for location. |

<a name="DevList+cleanQuery"></a>

### cleanQuery(param) ⇒ <code>String</code>
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

<a name="DevList+handleGeoNearSelect"></a>

### handleGeoNearSelect(location, locationLat, locationLng)
Talk to parent state handler for the 'Located Within' InputGeolocation component. Brings the
state for location, latitude, and longitude back from the InputGeolocation component and uses
the data to update the search query and state.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| location | <code>String</code> | Location returned from InputGeolocation. |
| locationLat | <code>String</code> | Latitude coordinate returned from InputGeolocation. |
| locationLng | <code>String</code> | Longitude coordinate returned from InputGeolocation. |

<a name="DevList+handleLocationSelect"></a>

### handleLocationSelect(place, placeLat, placeLng)
Talk to parent state handler for the 'Willing to Relocate' InputGeolocation component. Brings
the state for place, latitude, and longitude back from the InputGeolocation component and uses
the data to update the search query and state.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| place | <code>String</code> | Location returned from InputGeolocation. |
| placeLat | <code>String</code> | Latitude coordinate returned from InputGeolocation. |
| placeLng | <code>String</code> | Longitude coordinate returned from InputGeolocation. |

<a name="DevList+handleInput"></a>

### handleInput(event)
On Change event handler for inputs. Given the input element name and value, update the state
with the new value. If the input element is the miles input, call setGeoNearQuery before
updating the state.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Event object for change event. |

<a name="DevList+handleSelect"></a>

### handleSelect(value, name)
On Change event handler for select style filters. Given the select element name and value,
create a new query to update the page URL and update the state with the new value.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| value | <code>String</code> | Select element value. |
| name | <code>String</code> | Select element name. |

<a name="DevList+handleSwitch"></a>

### handleSwitch(event)
On Change event handler for toggle style filters. Given the name and checked field from the
event target, create a new query to update the page URL and update the state with the new value.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Event object for change event. |

<a name="DevList+handleSwitchEnable"></a>

### handleSwitchEnable(event)
On Click event handler for toggle filters enable/disable button. Given the name and the inner HTML
of the event target, create a new query to update the page URL and update the state with the new value.

**Kind**: instance method of [<code>DevList</code>](#DevList)

| Param | Type | Description |
| --- | --- | --- |
| event | <code>Event</code> | Event object for change event. |

<a name="DevList+render"></a>

### render() ⇒ <code>HTML</code>
Render method.
Build the Developer List/Browse page including filter/sort/pagination controls and a list of seekers.

**Kind**: instance method of [<code>DevList</code>](#DevList)

**Returns**: <code>HTML</code> - A responsive grid with filters in the left column and sort, pagination links and the
list of seekers in the right column.

<a name="DevList+getFilterState"></a>

### getFilterState() ⇒ <code>Object</code>
Return an additional state object for all filters saved on FILTERS constant.

**Kind**: static method of [<code>DevList</code>](#DevList)

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

### getPathname() ⇒ <code>String</code>
Return the pathname of the current page.

**Kind**: static method of [<code>DevList</code>](#DevList)

**Returns**: <code>String</code> - Current page pathname.

**Example**
```js
'/meetdev'
```
<a name="DevList+getQuery"></a>

### getQuery() ⇒ <code>String</code>
Return the search query for the current page.

**Kind**: static method of [<code>DevList</code>](#DevList)

**Returns**: <code>String</code> - Current page search query.

**Example**
```js
'page=2&desiredTitle=Front+End|Back+End'
```
<a name="DevList+getCurrentPage"></a>

### getCurrentPage() ⇒ <code>Integer</code>
Determine the current page using the URL query and return it. If no page is set
on the URL, return 1.

**Kind**: static method of [<code>DevList</code>](#DevList)

**Returns**: <code>Integer</code> - Current page number.







