module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        "plugin:@typescript-eslint/recommended",
        // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/react",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "eslint-plugin-import",
        "@typescript-eslint",
        "eslint-plugin-jsx-a11y"
    ],
    "rules": {
        'no-use-before-define':'off',  
        'no-void': [
            'error', {
            allowAsStatement: true, },
            ],
        'import/extensions':[   
            'error',
            'ignorePackages',
            {
                "js": 'never',
                "jsx": 'never',
                "ts": 'never',
                "tsx": 'never',

            }
        ],

        'react/jsx-filename-extension':[
            'error',
            {
                extensions:['.jsx','.tsx']
            },
        ],
    },
    "overrides":[
        {
            'files':['*.tsx'],
            'rules':{
                'react/prop-types':'off'
            }
        }
    ],
    "settings": {
        'import/resolver':{
            "node":{
                "paths":['src']
            },
        }
    },
    "root":true
};
