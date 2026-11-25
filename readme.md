


# BaserowIntegration

Mashup Sequencer project


For more technical informations : [documentation](./project.md)

- [Installation](#installation)
- [Symbols](#symbols)
- [Sequences](#sequences)
    - [CheckLogin](#checklogin)
    - [Cipher](#cipher)
    - [Decipher](#decipher)


## Installation

1. In your Convertigo Studio click on ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/icons/studio/project_import.gif?raw=true "Import a project in treeview") to import a project in the treeview
2. In the import wizard

   ![](https://github.com/convertigo/convertigo/blob/develop/eclipse-plugin-studio/tomcat/webapps/convertigo/templates/ftl/project_import_wzd.png?raw=true "Import Project")
   
   paste the text below into the `Project remote URL` field:
   <table>
     <tr><td>Usage</td><td>Click the copy button at the end of the line</td></tr>
     <tr><td>To contribute</td><td>

     ```
     BaserowIntegration=git@github.com:convertigo/c8oprj-baserowintegration.git:branch=master
     ```
     </td></tr>
     <tr><td>To simply use</td><td>

     ```
     BaserowIntegration=git@github.com:convertigo/c8oprj-baserowintegration/archive/master.zip
     ```
     </td></tr>
    </table>
3. Click the `Finish` button. This will automatically import the __BaserowIntegration__ project


## Symbols

Symbol | Value
------ | ------
BaserowIntegration.bridge.key.secret | Required. Key of the login bridge between C8Oforms and BaserowIntegration: 32 random bytes encoded in Base64 (44 characters, for example the output of `openssl rand -base64 32`). It must have the same value on the C8Oforms server, which signs the bridge tokens with it (C8Oforms reads the symbol of the same name).
BaserowIntegration.bridge.acceptLegacy | Optional, default `false`. `true` also accepts the tokens of older C8Oforms versions, during an update of C8Oforms; set it back to `false` once every C8Oforms server is updated.


## Sequences

### CheckLogin

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>token</td><td></td>
</tr>
</table>

### Cipher

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>value</td><td></td>
</tr>
</table>

### Decipher

**variables**

<table>
<tr>
<th>name</th><th>comment</th>
</tr>
<tr>
<td>value</td><td></td>
</tr>
</table>



