window["distri/finder:v0.1.2"]({
  "source": {
    "LICENSE": {
      "path": "LICENSE",
      "mode": "100644",
      "content": "The MIT License (MIT)\n\nCopyright (c) 2013 distri\n\nPermission is hereby granted, free of charge, to any person obtaining a copy of\nthis software and associated documentation files (the \"Software\"), to deal in\nthe Software without restriction, including without limitation the rights to\nuse, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of\nthe Software, and to permit persons to whom the Software is furnished to do so,\nsubject to the following conditions:\n\nThe above copyright notice and this permission notice shall be included in all\ncopies or substantial portions of the Software.\n\nTHE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR\nIMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS\nFOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR\nCOPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER\nIN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN\nCONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.\n",
      "type": "blob"
    },
    "README.md": {
      "path": "README.md",
      "mode": "100644",
      "content": "finder\n======\n\nQuery a set of objects using a jQuery like selector language.\n",
      "type": "blob"
    },
    "main.coffee.md": {
      "path": "main.coffee.md",
      "mode": "100644",
      "content": "Finder\n======\n\nUse a query language to filter an array of objects.\n\n    module.exports = (I={}, self=Core(I)) ->\n      self.extend\n\nGet a selection of objects that match the specified selector criteria.\nThe selector language can select objects by id, type, or attributes. This\nmethod always returns an Array.\n\n        find: (objects, selector, typeMatcher) ->\n          results = []\n\n          console.log selector, typeMatcher\n\n          matcher = generate(selector, typeMatcher)\n\n          objects.forEach (object) ->\n            results.push object if matcher object\n\n          results\n\n    parseSelector = (selector) ->\n      selector.split(\",\").invoke(\"trim\")\n\n    parseResult = (str) ->\n      try\n        JSON.parse(str)\n      catch\n        str\n\n    process = (item) ->\n      query = /^(\\w+)?#?([\\w\\-]+)?\\.?([\\w\\-]+)?=?([\\w\\-]+)?/.exec(item)\n\n      if query\n        if valueQuery = query[4]\n          query[4] = parseResult valueQuery\n\n        query.splice(1)\n      else\n        []\n\n    get = (object, property) ->\n      value = object?[property]\n\n      if typeof value is \"function\"\n        value.call(object)\n      else\n        value\n\n    defaultTypeMatcher = (type, object) ->\n      type is get(object, \"class\")\n\n    generate = (selector=\"\", typeMatcher=defaultTypeMatcher) ->\n      components = parseSelector(selector).map (piece) ->\n        process(piece)\n\n      (object) ->\n        for component in components\n          [type, id, attr, value] = component\n\n          idMatch = !id or (id is get(object, \"id\"))\n          typeMatch = !type or typeMatcher(type, object)\n\n          if attr\n            if value?\n              attrMatch = get(object, attr) is value\n            else\n              attrMatch = get(object, attr)\n          else\n            attrMatch = true\n\n          return true if idMatch && typeMatch && attrMatch\n\n        return false\n",
      "type": "blob"
    },
    "pixie.cson": {
      "path": "pixie.cson",
      "mode": "100644",
      "content": "version: \"0.1.2\"\nremoteDependencies: [\n  \"http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js\"\n]\n",
      "type": "blob"
    },
    "test/finder.coffee": {
      "path": "test/finder.coffee",
      "mode": "100644",
      "content": "Finder = require \"../main\"\n\ndescribe \"Finder\", ->\n  finder = Finder()\n\n  it \"should find objects with normal properties\", ->\n    results = finder.find([{\n      name: \"duder\"\n    }], \".name=duder\")\n\n    assert.equal results[0].name, \"duder\"\n\n  it \"should find obects with method properties\", ->\n    results = finder.find([{\n      name: -> \"duder\"\n    }], \".name=duder\")\n\n    assert.equal results[0].name(), \"duder\"\n\n  it \"should find objects by id attribute\", ->\n    results = finder.find([{\n      id: \"duder\"\n    }], \"#duder\")\n\n    assert.equal results[0].id, \"duder\"\n\n  it \"should find objects by id method\", ->\n    results = finder.find([{\n      id: -> \"duder\"\n    }], \"#duder\")\n\n    assert.equal results[0].id(), \"duder\"\n\n  it \"should allow specifying the type matcher\", ->\n    results = finder.find [\n      type: \"duder\"\n    ], \"duder\", (type, object) ->\n      console.log \"matching!\"\n      object.type is type\n\n    assert.equal results[0].type, \"duder\"\n",
      "type": "blob"
    }
  },
  "distribution": {
    "main": {
      "path": "main",
      "content": "(function() {\n  var defaultTypeMatcher, generate, get, parseResult, parseSelector, process;\n\n  module.exports = function(I, self) {\n    if (I == null) {\n      I = {};\n    }\n    if (self == null) {\n      self = Core(I);\n    }\n    return self.extend({\n      find: function(objects, selector, typeMatcher) {\n        var matcher, results;\n        results = [];\n        console.log(selector, typeMatcher);\n        matcher = generate(selector, typeMatcher);\n        objects.forEach(function(object) {\n          if (matcher(object)) {\n            return results.push(object);\n          }\n        });\n        return results;\n      }\n    });\n  };\n\n  parseSelector = function(selector) {\n    return selector.split(\",\").invoke(\"trim\");\n  };\n\n  parseResult = function(str) {\n    try {\n      return JSON.parse(str);\n    } catch (_error) {\n      return str;\n    }\n  };\n\n  process = function(item) {\n    var query, valueQuery;\n    query = /^(\\w+)?#?([\\w\\-]+)?\\.?([\\w\\-]+)?=?([\\w\\-]+)?/.exec(item);\n    if (query) {\n      if (valueQuery = query[4]) {\n        query[4] = parseResult(valueQuery);\n      }\n      return query.splice(1);\n    } else {\n      return [];\n    }\n  };\n\n  get = function(object, property) {\n    var value;\n    value = object != null ? object[property] : void 0;\n    if (typeof value === \"function\") {\n      return value.call(object);\n    } else {\n      return value;\n    }\n  };\n\n  defaultTypeMatcher = function(type, object) {\n    return type === get(object, \"class\");\n  };\n\n  generate = function(selector, typeMatcher) {\n    var components;\n    if (selector == null) {\n      selector = \"\";\n    }\n    if (typeMatcher == null) {\n      typeMatcher = defaultTypeMatcher;\n    }\n    components = parseSelector(selector).map(function(piece) {\n      return process(piece);\n    });\n    return function(object) {\n      var attr, attrMatch, component, id, idMatch, type, typeMatch, value, _i, _len;\n      for (_i = 0, _len = components.length; _i < _len; _i++) {\n        component = components[_i];\n        type = component[0], id = component[1], attr = component[2], value = component[3];\n        idMatch = !id || (id === get(object, \"id\"));\n        typeMatch = !type || typeMatcher(type, object);\n        if (attr) {\n          if (value != null) {\n            attrMatch = get(object, attr) === value;\n          } else {\n            attrMatch = get(object, attr);\n          }\n        } else {\n          attrMatch = true;\n        }\n        if (idMatch && typeMatch && attrMatch) {\n          return true;\n        }\n      }\n      return false;\n    };\n  };\n\n}).call(this);\n\n//# sourceURL=main.coffee",
      "type": "blob"
    },
    "pixie": {
      "path": "pixie",
      "content": "module.exports = {\"version\":\"0.1.2\",\"remoteDependencies\":[\"http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js\"]};",
      "type": "blob"
    },
    "test/finder": {
      "path": "test/finder",
      "content": "(function() {\n  var Finder;\n\n  Finder = require(\"../main\");\n\n  describe(\"Finder\", function() {\n    var finder;\n    finder = Finder();\n    it(\"should find objects with normal properties\", function() {\n      var results;\n      results = finder.find([\n        {\n          name: \"duder\"\n        }\n      ], \".name=duder\");\n      return assert.equal(results[0].name, \"duder\");\n    });\n    it(\"should find obects with method properties\", function() {\n      var results;\n      results = finder.find([\n        {\n          name: function() {\n            return \"duder\";\n          }\n        }\n      ], \".name=duder\");\n      return assert.equal(results[0].name(), \"duder\");\n    });\n    it(\"should find objects by id attribute\", function() {\n      var results;\n      results = finder.find([\n        {\n          id: \"duder\"\n        }\n      ], \"#duder\");\n      return assert.equal(results[0].id, \"duder\");\n    });\n    it(\"should find objects by id method\", function() {\n      var results;\n      results = finder.find([\n        {\n          id: function() {\n            return \"duder\";\n          }\n        }\n      ], \"#duder\");\n      return assert.equal(results[0].id(), \"duder\");\n    });\n    return it(\"should allow specifying the type matcher\", function() {\n      var results;\n      results = finder.find([\n        {\n          type: \"duder\"\n        }\n      ], \"duder\", function(type, object) {\n        console.log(\"matching!\");\n        return object.type === type;\n      });\n      return assert.equal(results[0].type, \"duder\");\n    });\n  });\n\n}).call(this);\n\n//# sourceURL=test/finder.coffee",
      "type": "blob"
    }
  },
  "progenitor": {
    "url": "http://strd6.github.io/editor/"
  },
  "version": "0.1.2",
  "entryPoint": "main",
  "remoteDependencies": [
    "http://strd6.github.io/tempest/javascripts/envweb-v0.4.7.js"
  ],
  "repository": {
    "id": 14910855,
    "name": "finder",
    "full_name": "distri/finder",
    "owner": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "private": false,
    "html_url": "https://github.com/distri/finder",
    "description": "Query a set of objects using a jQuery like selector language.",
    "fork": false,
    "url": "https://api.github.com/repos/distri/finder",
    "forks_url": "https://api.github.com/repos/distri/finder/forks",
    "keys_url": "https://api.github.com/repos/distri/finder/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/distri/finder/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/distri/finder/teams",
    "hooks_url": "https://api.github.com/repos/distri/finder/hooks",
    "issue_events_url": "https://api.github.com/repos/distri/finder/issues/events{/number}",
    "events_url": "https://api.github.com/repos/distri/finder/events",
    "assignees_url": "https://api.github.com/repos/distri/finder/assignees{/user}",
    "branches_url": "https://api.github.com/repos/distri/finder/branches{/branch}",
    "tags_url": "https://api.github.com/repos/distri/finder/tags",
    "blobs_url": "https://api.github.com/repos/distri/finder/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/distri/finder/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/distri/finder/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/distri/finder/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/distri/finder/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/distri/finder/languages",
    "stargazers_url": "https://api.github.com/repos/distri/finder/stargazers",
    "contributors_url": "https://api.github.com/repos/distri/finder/contributors",
    "subscribers_url": "https://api.github.com/repos/distri/finder/subscribers",
    "subscription_url": "https://api.github.com/repos/distri/finder/subscription",
    "commits_url": "https://api.github.com/repos/distri/finder/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/distri/finder/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/distri/finder/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/distri/finder/issues/comments/{number}",
    "contents_url": "https://api.github.com/repos/distri/finder/contents/{+path}",
    "compare_url": "https://api.github.com/repos/distri/finder/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/distri/finder/merges",
    "archive_url": "https://api.github.com/repos/distri/finder/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/distri/finder/downloads",
    "issues_url": "https://api.github.com/repos/distri/finder/issues{/number}",
    "pulls_url": "https://api.github.com/repos/distri/finder/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/distri/finder/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/distri/finder/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/distri/finder/labels{/name}",
    "releases_url": "https://api.github.com/repos/distri/finder/releases{/id}",
    "created_at": "2013-12-04T01:28:49Z",
    "updated_at": "2013-12-04T04:11:25Z",
    "pushed_at": "2013-12-04T04:11:25Z",
    "git_url": "git://github.com/distri/finder.git",
    "ssh_url": "git@github.com:distri/finder.git",
    "clone_url": "https://github.com/distri/finder.git",
    "svn_url": "https://github.com/distri/finder",
    "homepage": null,
    "size": 384,
    "stargazers_count": 0,
    "watchers_count": 0,
    "language": "CoffeeScript",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 0,
    "forks": 0,
    "open_issues": 0,
    "watchers": 0,
    "default_branch": "master",
    "master_branch": "master",
    "permissions": {
      "admin": true,
      "push": true,
      "pull": true
    },
    "organization": {
      "login": "distri",
      "id": 6005125,
      "avatar_url": "https://identicons.github.com/f90c81ffc1498e260c820082f2e7ca5f.png",
      "gravatar_id": null,
      "url": "https://api.github.com/users/distri",
      "html_url": "https://github.com/distri",
      "followers_url": "https://api.github.com/users/distri/followers",
      "following_url": "https://api.github.com/users/distri/following{/other_user}",
      "gists_url": "https://api.github.com/users/distri/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/distri/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/distri/subscriptions",
      "organizations_url": "https://api.github.com/users/distri/orgs",
      "repos_url": "https://api.github.com/users/distri/repos",
      "events_url": "https://api.github.com/users/distri/events{/privacy}",
      "received_events_url": "https://api.github.com/users/distri/received_events",
      "type": "Organization",
      "site_admin": false
    },
    "network_count": 0,
    "subscribers_count": 2,
    "branch": "v0.1.2",
    "defaultBranch": "master"
  },
  "dependencies": {}
});