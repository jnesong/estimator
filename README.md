## Estimator
<p> Estimator was designed for field technicians to estimate the cost of repair for custom facility projects. </p>

- - - - 

### Getting started
<details>
<summary> This application was created with React v.18.1.0. </summary>
Start the application by running:
<br/>
<br/>
npm install
<br/>
npm start
<br/>
<br/>

It runs on http://localhost:4003/.
The port can be changed by modifying **line 15** in the **package.json** file to the desired port number.
</details>

<details>
<summary> This application uses JSON server v.0.17.0. </summary>
If installation is needed, run:
<br/> 
<br/>
npm install -g json-server
<br/> 
<br/>
and to open run:
<br/> 
<br/>
json-server --watch projectdb.json
<br/> 
<br/>
Amend the default port by adding a port number to the end like so
<br/> 
<br/>
json-server --watch projectdb.json --port800
<br/> 
<br/>
</details>


<details>
<summary>This application uses MUI v.5.8.1</summary>
To install MUI run:
<br/>
<br/>
npm install @mui/material @emotion/react @emotion/styled
<br/>
npm install @mui/icons-material
<br/>
<br/>
Please refer to MUI documentation for further details: https://v1.mui.com/
</details>

<details>
<summary> This application uses React Uuid v.1.0.2. </summary>
If installation is needed, run:
<br/> 
<br/>
npm i react-uuid
<br/> 
<br/>
Please refer to React Uuid documentation for further details: https://www.npmjs.com/package/react-uuid
</details>

- - - -

### Usage
<p> Estimator was created in response to a code challenge prompt. It is not intended for external use at this time. </p>
<p> As users enter details about each project, the total cost is calculated. Each item line has the option to include a cost category. The current default selection options are Material, Labor, and All Inclusive. Users can also name their own category. There is an option to save a project and have all the saved projects' total calculated. There are also options to download a CSV summary of each project to share with the user's team. Users can edit a saved project at anytime. Users can also retrieve deleted projects with the Undo button. Furthermore, projects can be sorted by alphabet, cost, and status. The following project status' are currently available: Proactive, Serviceable, and Critical.</p>

### Further Improvements
- Ability for users to login - therefore a complete backend with password encryption. 
- Separate calculation sums for material costs, labor costs, all inclusive costs, and miscellaneous costs. 
