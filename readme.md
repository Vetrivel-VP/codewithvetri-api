Initialization
Clone the repository into a folder

```
git clone https://github.com/Vetrivel-VP/codewithvetri_api.git
```

Navigate to exercise folder

Open Terminal

| Commands                   | Description                                                                                      |
| -------------------------- | ------------------------------------------------------------------------------------------------ |
| npm init                   | To initialise the Node Modules                                                                   |
| npm install --save express | Express is a minimal and flexible Node.js web application framework Visit https://expressjs.com/ |
| npm install --save cors    | Cross origin                                                                                     |
| npm install -g nodemon     | To run your app in localhost -g refers global                                                    |

if you get this error code: 'ENOENT',
change the the follwoing firebase.json

```
"predeploy": ["npm --prefix \"%RESOURCE_DIR%\" run lint"]
```

change the following the package.json

```
"scripts": {
    "lint": "eslint",
  },
```
