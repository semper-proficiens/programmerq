.PHONY: help session
help:
	@grep -E '^[a-zA-Z0-9_-]+%?:.*?## .*$$' $(MAKEFILE_LIST) | sed -e 's/^Makefile://' | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

get_hacker_breaches: ## pass the API_KEY env var (e.g. API_KEY=secret_value make get_hacker_breaches)
	@python3 apis/hibp_api/hacker_breaches/hacker_breaches.py