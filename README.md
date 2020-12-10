# Genshin Impact - Account Review

Application Link: https://altivu.github.io/Genshin-Impact-Account-Review/

This web application is meant to be a snapshot of my account progress for Genshin Impact as of Wednesday, December 9th, 2020 (unsure if I will update this in the future). It is tailored to be reviewed by https://www.twitch.tv/xlice, but is largely generic beyond the homepage.

## Technologies Used
- React
- Material UI
- SheetJS
- gh-pages

## Features
- Extracts information from an Excel document and feeds it to the following pages, which are styled accordingly:
  - Characters
  - Weapons
  - Artifacts

## Issues
- Cannot handle fresh page loads for non-root urls due to GitHub Pages not natively supporting single page apps. A preliminary attempt to use the files as detailed https://github.com/rafgraph/spa-github-pages has not worked.
