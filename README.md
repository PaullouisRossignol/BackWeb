# Description
This project makes part of our academic cours. It is mostly destined to demonstrate the backend management CRUD of the website.

The project is developed with use of: 
	
	- Node.js
	
	- JavaScript
	
	- TypeScript
	
	- Bootstrap v3

	- MongoDB

	- Mocha and Chai for testing 

Made by Artemii Lazovskii and Paul-Louis Rossignol

# Requirements

You need this list of utilities to be installed on your computer in order to run this project:

`npm` v6.13.1

`docker` v19.03.5

`git`

# Installation 

Clone or download https://github.com/PaullouisRossignol/ProjetBackWeb

Go into the folder containing the project and run `npm init`

# Running the project

## Launching

Run `npm run startDB` in order to launch the MongoDB database under the docker.

Run `npm start` and go to the `localhost:8080` in your web browser.

That's it, now you are able to test out the project.

## Testing

Run `npm test` to execute the testing part

# Routing
|Route|Description|Parameters|
|-----|-----------|----------|
|*GET*: `/`|Welcome Page||
|*GET*: `/userPage`|User Page|`user_id`|
|*POST*: `/getUserMetrics`|Returns the metrics of a concrete user|`user_id`|
|*POST*: `/connectUser`|Connects user from the database|`email/password`|
|*POST*: `/addUser`|Adds User into the database|`email/password`|
|*POST*: `/addMetric`|Adds metric to the database|`user_id/debts_descrtiption/amount`|
|*POST*: `/delUser`|Deletes user and its metrics from the database|`user_id`|
|*POST*: `/delMetric`|Deletes a concrete metric from the database|`metric_id`|
|*POST*: `/upUser`|Updates user info|`user_id/email/password`|
|*POST*: `/upMetric`|Updates a concrete metric|`metric_id`|

