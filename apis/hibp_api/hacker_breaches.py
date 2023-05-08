import requests,datetime,os,operator,hashlib,email
from helpers import hash_private_data

now = datetime.datetime.now()
first_day_of_year = datetime.datetime(now.year, 1, 1).strftime('%Y-%m-%d')

class HIBPApi:
    def __init__(self, api_key=None):
        self.base_url = 'https://haveibeenpwned.com/api/v3'
        self.headers = {
            'User-Agent': 'Python-HIBP-API-Client',
            'hibp-api-key': api_key
        }

    def get_breaches(self):
        # this endpoint gets an array of breach objects
        url = f"{self.base_url}/breaches"
        response = requests.get(url, headers=self.headers)

        if response.status_code == 401:
            raise ValueError('Unauthorized: API key is invalid or missing')
        elif response.status_code != 200:
            raise ValueError('Error fetching data from HIBP API')
        else:
            this_year_breaches = []
            for breach in response.json():
                if breach['BreachDate'] >= first_day_of_year and breach['IsVerified'] == True:
                    this_year_breaches.append({
                        "Name" : breach['Name'], 
                        "BreachDate" : breach['BreachDate']
                    })
            sorted_breaches = sorted(this_year_breaches, key=operator.itemgetter('BreachDate'), reverse=True)
            # Only last 5
            print(f"The last 5 verified public breaches:\n{sorted_breaches[:5]}")
            return sorted_breaches[:5]
        
    def get_pwned_emails(self, emails):
        emails_breached_data = []
        for email in emails:
            # hashed_email = hash_private_data(email)
            url = f"{self.base_url}/breachedaccount/{email}"

            response = requests.get(url, headers=self.headers)
            if response.status_code == 401:
                raise ValueError('Unauthorized: API key is invalid or missing')
            # if email is not in a breach api responds with 404
            if response.status_code == 404:
                response = f"Email '{email}' not found in a breach in HIBP"
            # we're getting rate limited
            if response.status_code == 429:
                response = f"HIBP_KEY is being rate-limited"
            elif response.status_code != 200:
                raise ValueError(f"Error fetching data from HIBP API: {response.status_code}")
            else:
                emails_breached_data.append(
                    {
                        "Email" : email,
                        "BreachedEmailData" : response.json()
                    }
                )
        print(emails_breached_data)
        return emails_breached_data
                

if __name__ == '__main__':
    api_key = os.environ.get('HIBP_KEY')
    if api_key is None:
        raise ValueError('API key not set in environment variable API_KEY')

    api = HIBPApi(api_key)
    try:
        api.get_breaches()
        api.get_pwned_emails(["erneanew@hotmail.com", "eperezla@outlook.com"])
    except ValueError as e:
        print(f"Error: {str(e)}")
