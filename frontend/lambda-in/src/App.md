## Functions

<dl>
<dt><a href="#setGlobalState">setGlobalState(properties)</a> ⇒ <code>void</code></dt>
<dd><p>Set APP&#39;s global state.</p>
</dd>
<dt><a href="#getGlobalState">getGlobalState(property)</a> ⇒ <code>object</code></dt>
<dd><p>Get APP&#39;s global state.</p>
</dd>
</dl>

<a name="setGlobalState"></a>

## setGlobalState(properties) ⇒ <code>void</code>
Set APP's global state.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| properties | <code>object</code> | Properties to be set. { property_name: property_value } |

**Example**  
```js
Pass as a prop to component.
<Component setGS={this.setGlobalState} />
```
<a name="getGlobalState"></a>

## getGlobalState(property) ⇒ <code>object</code>
Get APP's global state.

**Kind**: global function  
**Returns**: <code>object</code> - App's global state.  

| Param | Type | Description |
| --- | --- | --- |
| property | <code>string</code> | the property of which we want to know its value. |

**Example**  
```js
Pass as a prop to component.
<Component getGS={this.getGlobalState} />
```
