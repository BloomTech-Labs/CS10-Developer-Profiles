<a name="Pagination"></a>

## Pagination

**Kind**: A React class component

**See**

- {@link https://reacttraining.com/react-router/web/api/Link } for the Link API.

**Properties**

| Name | Type | Description |
| --- | --- | --- |
| maxPageLinks | <code>Integer</code> | The maximum number of page links to generate. |
| lowLimit | <code>Integer</code> | Tha max point the current page can be at to generate a low page range. |
| highLimit | <code>Integer</code> | The min point the current page can be at to generate a high page range. |
| pageLinks | <code>Array</code> | Range of page links to generate. |


* [Pagination](#Pagination)
    * [\<Pagination />](#new_Pagination_new)
    * [.cleanQuery(query)](#Pagination+cleanQuery) ⇒ <code>Array</code>
    * [.getAllPageLinks()](#Pagination+getAllPageLinks) ⇒ <code>Array</code>
    * [.getLowRangePageLinks()](#Pagination+getLowRangePageLinks) ⇒ <code>Array</code>
    * [.getHighRangePageLinks()](#Pagination+getHighRangePageLinks) ⇒ <code>Array</code>
    * [.getMidRangePageLinks()](#Pagination+getMidRangePageLinks) ⇒ <code>Array</code>
    * [.getPageLinks()](#Pagination+getPageLinks) ⇒ <code>Array</code>
    * [.render()](#Pagination+render) ⇒ <code>HTML</code>

<a name="new_Pagination_new"></a>

### \<Pagination />
A component that generates links to navigate through a list of pages.


| Param | Type | Description |
| --- | --- | --- |
| props | <code>Object</code> | Component properties. |
| props.pages | <code>Integer</code> | The total number of pages that should exist. |
| props.currentPage | <code>Integer</code> | The current page number. |
| props.pathName | <code>String</code> | The current page url pathname. |
| props.query | <code>String</code> | The current page url search query. |

**Example**
```js
Ex: If current page is less than low limit, the page range will always be 1,2,3,4,5,6
```
**Example**
```js
Ex: If current page is more than high limit, the page range will always be 34,35,36,37,38,39
```
<a name="Pagination+cleanQuery"></a>

### pagination.cleanQuery(query) ⇒ <code>String</code>
Given a url search query, return the query string with the page parameter removed.

**Kind**: instance method of [<code>Pagination</code>](#Pagination)

**Returns**: <code>String</code> - Query string with page parameter removed.

| Param | Type | Description |
| --- | --- | --- |
| query | <code>String</code> | A url search query. |

**Example**
```js
'page=2&desiredTitle=Front+End|Back+End'
```
<a name="Pagination+getAllPageLinks"></a>

### pagination.getAllPageLinks() ⇒ <code>Array</code>
Generate a range from 1 to the total number of pages and return the list in an array.

**Kind**: instance method of [<code>Pagination</code>](#Pagination)

**Returns**: <code>Array</code> - Array with page range.
<a name="Pagination+getLowRangePageLinks"></a>

### pagination.getLowRangePageLinks() ⇒ <code>Array</code>
Generate a range from 1 to the lowLimit and return the list in an array.

**Kind**: instance method of [<code>Pagination</code>](#Pagination)

**Returns**: <code>Array</code> - Array with page range.
<a name="Pagination+getHighRangePageLinks"></a>

### pagination.getHighRangePageLinks() ⇒ <code>Array</code>
Generate a range from the highLimit to the total number of pages and return the list in an array.

**Kind**: instance method of [<code>Pagination</code>](#Pagination)

**Returns**: <code>Array</code> - Array with page range.
<a name="Pagination+getMidRangePageLinks"></a>

### pagination.getMidRangePageLinks() ⇒ <code>Array</code>
Determine the start point for the page range and generate a range from the start to the max number
of page links and return list in an array.

**Kind**: instance method of [<code>Pagination</code>](#Pagination)

**Returns**: <code>Array</code> - Array with page range.
<a name="Pagination+getPageLinks"></a>

### pagination.getPageLinks() ⇒ <code>Array</code>
Using the passed in props pages and currentPage and the maxPageLinks, lowLimit and highLimit on the
state, determine which method to call to generate the appropriate page range. Return the page range as
an array of integers.

**Kind**: instance method of [<code>Pagination</code>](#Pagination)

**Returns**: <code>Array</code> - Array with page range

<a name="Pagination+render"></a>

### pagination.render() ⇒ <code>HTML</code>
Render method.
Get the range of page links and a clean query string and return HTML for the page links.

**Kind**: instance method of [<code>Pagination</code>](#Pagination)

**Returns**: <code>HTML</code> - HTML unordered list of page links