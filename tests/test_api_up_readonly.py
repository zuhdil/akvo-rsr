import requests

def fetch_auth(server,par):
    """Fetch an API key for a user from the server"""
    url = server + "/auth/token/?format=json"
    body = {"username" : par["user"], \
            "password" : par["pwd"], \
            "handles_unemployed" : "True"}

    r = requests.post(url, data=body)
    #print "Rq:", r.text
    #print "Authorization:", r.status_code
    assert (r.status_code == 200) 
    return r.json()

def fetch_countries(server):
    """Fetch a page of countries."""
    url = server + "/rest/v1/country/?format=json"
    countries = requests.get(url , headers=auth_header)
    assert (countries.status_code == 200) 
    return countries.json()

def fetch_project(server,projId):
    """Fetch a project."""
    url = server + "/rest/v1/project/" + str(projId) + "/?format=json"
    proj = requests.get(url , headers=auth_header)
    assert (proj.status_code == 200) 
    return proj.json()

def fetch_updates(server,projId):
    """Fetch updates for a project."""
    pups = requests.get(server + "/rest/v1/project_update/?project=" + str(projId) + "&format=json&last_modified_at__gt=1970-01-01T00:00:00", headers=auth_header)
    print "Updates status:", pups.status_code 
    assert (pups.status_code == 200) 
    return pups.json()

    
if __name__ == "__main__":
    my_creds = {"user":"testuser",\
                "pwd":"testpwd" }
    server = "http://rsr.test.akvo.org"

    all_auth = fetch_auth(server,my_creds)
    api_key = all_auth["api_key"]
    auth_header = {"Authorization" : "Token " + api_key}

    orgs = all_auth["organisations"]
    projs = all_auth["published_projects"]
    
    print "API key:", api_key
    print "Projects:", projs

    for projid in projs:
        #try to get a project
        proj = fetch_project(server,projid)
        print "-Project:", proj[u'id'], proj[u'title']
        #try to get the updates
        pups = fetch_updates(server,projid)
        for up in pups[u'results']:
            print "--Update", up[u'id'], up[u'title']
    
    #fetch start of the country list
    fetch_countries(server)
