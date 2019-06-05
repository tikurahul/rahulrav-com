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

### Other Admin Actions

To clean existing indexes:

```bash
gcloud datastore cleanup-indexes src/main/webapp/WEB-INF/index.yaml
```

Deploy Indexes:

```bash
./gradlew appengineDeployIndex
```
