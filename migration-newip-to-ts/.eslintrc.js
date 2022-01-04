module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    /* extends: [
      "plugin:import/errors",
      "plugin:import/warnings",
      "plugin:import/typescript",
    ], */
    extends: ['airbnb-base/legacy', 'airbnb-typescript/base', 'eslint-config-airbnb-base'],
    env: {
            "browser": true,
            "es2021": true
    },  
    parserOptions: {
      "project": './tsconfig.json',
      "ecmaVersion": 2020,
      "sourceType": "module"
    },
    settings: {
        "import/extensions": ["", ".ts", ".js", ".json"],
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
          "typescript": {},
          "node": {
            "extensions": ["", ".ts", ".js", ".json"],
          }
        }
    },
    globals: {
      "NodeJS": true
    },
    env: {
      "es6": true,
      "browser": true,
  },
    rules: {
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "": "never",
              "ts": "never",
              "js": "never",
              "json": "never"
            }
        ],
        "import/no-named-as-default": 0,
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        "no-console": 0,
        "consistent-return": 0,
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"]
     }
  };