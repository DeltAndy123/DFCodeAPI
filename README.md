# DiamondFire Code API

This is an API to search through a [DiamondFire](https://mcdiamondfire.com/home/) [action dump](https://github.com/DFOnline/CodeClient/wiki/actiondump).

# API Documentation

## Overview

This API provides access to a collection of actions, codeblocks, and events. It supports retrieving all items in each category or searching within them based on specific criteria.

## Endpoints

### Root (`/`)

- **Method:** GET
- **Description:** Retrieves the entire JSON data.
- **Response:**
  - `200 OK`: JSON data of the entire action dump.

### Codeblocks

#### List Codeblocks (`/codeblocks`)

- **Method:** GET
- **Description:** Retrieves all codeblocks.
- **Response:**
  - `200 OK`: JSON data of all codeblocks.

#### Search Codeblocks (`/codeblocks/search`)

- **Method:** GET
- **Description:** Searches within codeblocks based on a query.
- **Query Parameters:**
  - `q`: The search query string.
- **Response:**
  - `200 OK`: JSON data of matching codeblocks.

### Events

#### List Events (`/events`)

- **Method:** GET
- **Description:** Retrieves all events.
- **Response:**
  - `200 OK`: JSON data of all events.

#### Search Events (`/events/search`)

- **Method:** GET
- **Description:** Searches within events based on various criteria.
- **Query Parameters:**
  - `q`: The search query string.
  - `requiredrank`: Filters events by the required rank.
- **Response:**
  - `200 OK`: JSON data of matching events.

### Actions

#### List Actions (`/actions`)

- **Method:** GET
- **Description:** Retrieves all actions.
- **Response:**
  - `200 OK`: JSON data of all actions.

#### Search Actions (`/actions/search`)

- **Method:** GET
- **Description:** Searches within actions based on various criteria.
- **Query Parameters:**
  - `q`: The search query string.
  - `requiredrank`: Filters actions by the required rank.
  - `workswith`: Filters actions by compatibility.
- **Response:**
  - `200 OK`: JSON data of matching actions.

## Functionality Details

- `jsonResponse(data)`: Returns a JSON formatted response containing the data.
- Search functionality is provided using `ActionDump.search()`, which filters the data based on specified fields and query parameters.

## Search Logic

- **Codeblocks:** Searches by name and item description.
- **Events:** Searches by name, aliases, icon name, icon description, and optional rank.
- **Actions:** Searches by name, icon name, aliases, icon description, and filters by rank and compatibility attributes.
