
# ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/core/images/project_color_16x16.png?raw=true "Project") BaserowIntegration

Mashup Sequencer project

<details><summary><span style="color:DarkGoldenRod"><i>References</i></span></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/references/images/ProjectSchemaReference_16x16.png?raw=true "ProjectSchemaReference") lib_BaseRow


see [readme](https://github.com/convertigo/c8oprj-lib-baserow/tree/ec3ac68a25f448a4b264582dd217f54a34f060cc#readme)
</p></blockquote></details>

<details><summary><span style="color:DarkGoldenRod"><i>Connectors</i></span></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/connectors/images/httpconnector_color_16x16.png?raw=true "HttpConnector") Baserow



<details><summary><span style="color:DarkGoldenRod"><i>Transactions</i></span></summary><blockquote><p>


<details><summary><b>_api_admin_users__GET</b> : Returns all users with detailed information on each user, if the requesting user is staff</summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/jsonhttptransaction_color_16x16.png?raw=true "JsonHttpTransaction") _api_admin_users__GET

Returns all users with detailed information on each user, if the requesting user is staff. 

This is a **premium** feature.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;page
</td>
<td>
Defines which page should be returned.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;search
</td>
<td>
If provided only users that match the query will be returned.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;size
</td>
<td>
Defines how many users should be returned per page.
</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;sorts
</td>
<td>
A comma separated string of attributes to sort by, each attribute must be prefixed with `+` for a descending sort or a `-` for an ascending sort. The accepted attribute names are: id, is_active, name, username, date_joined, last_login. For example `sorts=-id,-is_active` will sort the users first by descending id and then ascending is_active. A sortparameter with multiple instances of the same sort attribute will respond with the ERROR_ADMIN_LISTING_INVALID_SORT_ATTRIBUTE error.
</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>_api_settings__GET</b> : Responds with all the admin configured settings</summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/jsonhttptransaction_color_16x16.png?raw=true "JsonHttpTransaction") _api_settings__GET

Responds with all the admin configured settings.
</p></blockquote></details>

<details><summary><b>_api_settings_update__PATCH</b> : Updates the admin configured settings if the user has admin permissions</summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/jsonhttptransaction_color_16x16.png?raw=true "JsonHttpTransaction") _api_settings_update__PATCH

Updates the admin configured settings if the user has admin permissions.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;allow_new_signups
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>_api_user_token_auth__POST</b> : Authenticates an existing user based on their username, which is their email address, and their password</summary><blockquote><p>


### ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/transactions/images/jsonhttptransaction_color_16x16.png?raw=true "JsonHttpTransaction") _api_user_token_auth__POST

Authenticates an existing user based on their username, which is their email address, and their password. If successful a JWT token will be generated that can be used to authorize for other endpoints that require authorization. The token will be valid for 60 minutes, so it has to be refreshed using the **token_refresh** endpoint before that time.

<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;email
</td>
<td>

</td>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableHttpVariable" >&nbsp;password
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>
</p></blockquote></details>
</p></blockquote></details>

<details><summary><span style="color:DarkGoldenRod"><i>Sequences</i></span></summary><blockquote><p>


<details><summary><b>CheckLogin</b></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") CheckLogin



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;token
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>Cipher</b></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") Cipher



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;value
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>

<details><summary><b>Decipher</b></summary><blockquote><p>


## ![](https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/sequences/images/genericsequence_color_16x16.png?raw=true "GenericSequence") Decipher



<span style="color:DarkGoldenRod">Variables</span>

<table>
<tr>
<th>
name
</th>
<th>
comment
</th>
</tr>
<tr>
<td>
<img src="https://github.com/convertigo/convertigo/blob/develop/engine/src/com/twinsoft/convertigo/beans/variables/images/variable_color_16x16.png?raw=true "  alt="RequestableVariable" >&nbsp;value
</td>
<td>

</td>
</tr>
</table>

</p></blockquote></details>
</p></blockquote></details>
