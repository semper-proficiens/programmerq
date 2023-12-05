.PHONY: help session
help:
	@grep -E '^[a-zA-Z0-9_-]+%?:.*?## .*$$' $(MAKEFILE_LIST) | sed -e 's/^Makefile://' | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

app-build: ## builds the app in docker
	docker build --no-cache -t programmerq .

app-run: ## runs docker build in port 3000
	docker run -it -p 3000:3000 --rm programmerq

local_run: ## we would normally run 'npm start' but there is an ssl error, and this is a workaround
	npm start

