## rahulrav.com 

This is my blog. 

### Running the web app.

```bash
./gradlew run
```

### Deploying the web app.

Select the GCP project. Then deploy to App Engine.

```bash
gcloud config set project rahulrav-com
```

### Local Development, and Writing a Blog

* Start the App Engine development server using `./gradlew run`.
* In another terminal run `./gradlew -t build` which creates a watch on all the `src`
  folders, and sets up live reload.
* From the `tools` directory run `npm run-script watch` to setup a watch on the `resources/blog/md`
  folder which is the input to the generator responsible in generating the HTML. Also update `manifest.json` to add blog metadata.

### Other useful commands

```bash
# Build tooling that can convert Markdown to formatted HTML
npm run-script build-tools

# Build Template & Styles
npm run-script build-core

# Local Development
npm run-script watch
```

### Other Admin Actions

To deploy the app:

```bash
# Use this because `./gradlew appengineDeploy` just seems to hang forever.
./gradlew appengineStage
# Navigate to the staging directory
cd build/staged-app && gcloud app deploy && cd ..
```
