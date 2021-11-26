module.exports = {
    extends: ['airbnb-base', 'airbnb-typescript/base', 'eslint-config-airbnb-base'],
    //parser: "babel-eslint",
    env: {
            "browser": true,
            "es2021": true
    },  
    parserOptions: {
      "project": './tsconfig.json',
    },
    settings: {
        "import/extensions": [".js", ".jsx", ".ts", ".tsx"],
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
          "node": {
            "extensions": [".js", ".jsx", ".ts", ".tsx"]
          }
        }
    },
    globals: {
      "NodeJS": true
    },
    rules: {
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            }
        ],
        "import/no-named-as-default": 0,
        "no-restricted-syntax": ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
        "no-console": "off",
        "consistent-return": 0
     }
  };