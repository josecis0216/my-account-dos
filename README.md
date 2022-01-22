# my-account
Structure:
```
store -> state storage group in folders (auth, products, .ect)
    - this contains the busines logic layer
    - access state data via getters
    - change starte data via actions
        - actions call mutators
    - stores should be generic
        - single product store - and if/when differences arise then we can include sub componenets based off of data flags
        - what it doesn't mean
            - single graph component that can just render every style of graph.
api -> interactions with backend api storage
mixins -> generic helper functions/data
config -> application wide global data
components -> self contained vue templates
    - these contain display logic only
    - only store display state in stores if it needs to persist on page reload
    - structure/layout css should be scoped in the component
    - design css ( colors, fonts, .etc) should use global css classes from host website
assets -> this folder will be pushed to a CDN and should not be direectly included
    - there is a dev and production url - the rest of the path will follow folder structure
views - top level "pages"
routes - all routes for the app
```

# Local Development Setup

1. Clone this repo to your machine.

2. Run `docker-compose up -d`

3. Wait 1-2 minutes for npm install to finish running (first time only)

4. Local development npm run serve should be serving at `[http://localhost:8003](http://localhost:8003)`


# Revert Instructions

You have 2 options to revert a deployment from this repository:

* Revert the merge pull request in BitBucket, which creates a new merge commit and runs a new pipeline to recompile an old version of the app.

* Re-run a previous BitBucket pipeline so the app is re-compiled and uploaded as the latest version.
