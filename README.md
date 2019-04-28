# easy-docker

`easy-docker` is a simple wrapper around Docker commands, written in Node.

## Usage

- `dbash`: `docker exec -it CONTAINER_ID /bin/bash`
- `dlogs`: `docker logs --follow CONTAINER_ID`
- `drestart`: `docker restart CONTAINER_ID`
- `dstop`: `docker stop CONTAINER_ID`

![](public/usage.gif)

## Installation

- Install from Github
```bash
git clone git@github.com:marcenacp/easy-docker.git
cd easy-docker/
npm install
npm link
```

- Use all shortcuts listed above
