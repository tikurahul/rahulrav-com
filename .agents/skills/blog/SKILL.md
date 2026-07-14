---
name: blog-tools
description: A collection of helpers to build the blog.
---

# Building the blog with automatic-restarts on changes

This app uses a combination of Gradle (to build the Ktor web archive), and a set of tools to build the actual static HTML for the blog posts.

## Building static content

```bash
# One time
cd src/main/tools
fnm use

# If it's a one-off build
npm run-script build

# Automatically re-build content when things change.
# Look at the package.json for more tools
npm run-script watch
```

## Running Ktor with automatic restart

Use 2 Terminal windows to do the following:

1. Run the server

```bash
./gradlew run
```

2. Automatically restart Ktor when content changes

```bash
./gradlew -t build
```

## Stopping

```bash
# Kill the watch process if you used `npm run-script watch`.

./gradlew --stop
```

## Adding a new blog entry

* In `src/main/resources/blog/md` add a new markdown file for the blog entry. The filename should be in the format `title.md` where `title` is `_` separated and in lower case.
* Add an entry in the `"posts"` array in `src/main/resources/blog/md/manifest.json` to include the new file in the build process. The entry should have the format:

```json
{
    "title": "Title of the blog entry",
    "path": "title.md"
}
```

* The content of the markdown file should include the current date, and day with the following format:

```text
Month Date Day, Year
```

For example:

```text
October 10 Thursday, 2026
```

* Add an entry for the blog in `src/main/resources/blog/md/toc.md`. The format should look like this:

```md
* [Title of the blog entry](/blog/title_of_blog_entry.html)
```

Make sure to add this link under the right year (based on the current date).

## Deploying to Google App Engine

Make sure you do the following:

```bash
# 1. Build the blog
cd src/main/tools && npm run-script build && npm run-script blog && cd -

# 2. Stage the application for appengine
./gradlew appengineStage

# 3. Deploy
cd build/staged-app && gcloud app deploy && cd -
```
