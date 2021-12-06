module.exports = {
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ['airbnb-base/legacy', 'airbnb-typescript/base', 'eslint-config-airbnb-base'],
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
        "consistent-return": 0,
        'linebreak-style': ['error', process.platform === 'win32' ? 'windows' : 'unix'],
        "no-shadow": "off",
        "@typescript-eslint/no-shadow": ["error"]
     }
  };