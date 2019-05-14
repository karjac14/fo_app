import React from 'react'

export default function about() {
    return (
        <div className="container page-main">
            <h2>About this project</h2>
            <p>
            The project is currently in the rapid prototyping stage. It aims to show a web application where users can get weekly meal recipes according to their preferences. The end goal of this application is to help users plan their meals easily.
            </p>
            <br/>

            <h4>Project Phases:</h4>

            <h6>Phase 1:</h6>

            <ul className="list-unstyled">
  <li>Scaffolding of the web application and server.</li>
  <li>Users are able to create an account, log in and log out to the application.</li>
  <li>Users will be able to choose their dietary preferences and health requirements.</li>
  <li>Users will be able to choose specific meals from a pool of suggestions.</li>
  <li>User should be able to quickly access the recipes they have selected.</li>
  <li>Stretch goals: 
      <ul className="list-unstyled">
          <li>users will able to export the ingredients to a grocery list.</li>
        </ul>
    </li>

</ul>


<h6>Phase 2:</h6>
<ul class="list-unstyled">
<li>Research the feasibility of connecting the web application to an online retail grocery store such as Woolworth and Coles.</li>
<li> Sending the ingredients list to their application and make grocery shopping easier for the user.</li>
</ul>


<h6>Phase 3:</h6>

<ul class="list-unstyled">
<li>Convert the app to a software as a service (Saas) form.
</li>
</ul>
<p></p>
<br/>
<h4>Technology Stack:</h4>
<ul class="list-unstyled">
<li>React, Redux</li>
<li>Node.js, Express.js, Firebase Cloud Functions</li>
<li>Firestore</li>
</ul>
        </div>
    )
}
