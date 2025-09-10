# Running Postman CLI

## Getting Started

Install [Postman CLI](https://learning.postman.com/docs/postman-cli/postman-cli-installation/)

```bash
# Check postman cli version
postman -v

# Login to postman
postman login <your-api-key>
```

## Run a Collection

### v1

```bash


postman collection run ./postman/v1/openmusic_api_v1_collection.json -e ./postman/v1/openmusic_api_v1_environment.json
```

### v2

```bash
postman collection run ./postman/v2/openmusic_api_v2_collection.json -e ./postman/v2/openmusic_api_v2_environment.json
```

### v3

> Coming Soon
