# MangaVerse: A MangaDex Manga Viewer

## Description

The MangaDex Manga Viewer is a web application that allows users to view the latest updated manga from MangaDex, an online manga platform. It provides a user-friendly interface for exploring manga titles, reading chapters, and accessing information about each manga.

## Features

* View the latest updated manga on MangaDex.
* Explore manga titles along with their cover art and descriptions.
* Read individual chapters of a manga with chapter details and images.
* Sort manga by the latest uploaded chapter.
* Access manga genres and status information.
* Use an attractive manga cover display.
* Format and display dates in a user-friendly manner using the formatDate function.

## Libraries and Technologies

* Svelte: Used to build the user interface and manage state with Svelte stores.
* Svelte Kit: Powering the routing and building the web application.
* MangaDex API: Utilized to fetch manga and chapter data from MangaDex.
* Intl: For date formatting using the `formatDate` function.

Dependencies

* `@fontsource/jetbrains-mono`, `@fontsource/manrope`: Fonts for the application.
* `lucide-svelte`: SVG icon library in Svelte components.
* `open-props`: Utility for opening CSS custom properties in Svelte.

## File Structure

The project is organized into two main directories:

1. src/routes: Contains Svelte Kit route components, including the home page, manga detail page, and chapter pages.
2. src/lib: Holds shared utility functions and types.

## Installation

To run the MangaDex Manga Viewer locally, follow these steps:

1. Clone the repository: `git clone [repository_url]`
2. Change to the project directory: `cd [project_directory]`
3. Install the dependencies: `npm install or yarn install`
4. Start the development server: `npm run dev or yarn dev`

## Usage

Once the development server is running, you can access the Manga Viewer by visiting http://localhost:5173 (or the port specified in your configuration) in your web browser. You will be able to view the latest manga and read individual chapters by navigating through the interface.

Thank you for using the MangaDex Manga Viewer. We hope you enjoy reading manga with our application!
