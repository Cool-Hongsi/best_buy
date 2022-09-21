# ESLint

- Javascript 코드 문법 검사 및 코딩 스타일 검사
- Project Run을 해야 알 수 있는 Warning or Error를 사전에 코드에서 발견할 수 있다.
- ESLint Extension 설치
- Typescript 사용시 필요 package
- npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
- npm install -D prettier eslint-plugin-prettier
- root에 .eslintrc 파일 생성 및 내용 추가

```
{
  // 전역변수 환경 설정
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },

  // npm을 통해 설치한 외부 ESLint 설정 등록 (eslint-config-{name}으로 설치)
  "extends": [
    "react-app",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],

  // ESLint에 지원할 JavaScript 옵션 설정
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 12,
    "sourceType": "module"
  },

  // parser 등록
  "parser": "@typescript-eslint/parser",

  // 사용자 규칙 추가할 플러그인 (eslint-plugin-{name}으로 설치)
  "plugins": [
    "@typescript-eslint",
    "prettier"
  ],

  // 플러그인을 통해 설치한 것 외에 규칙 설정
  "rules": {
    "prettier/prettier": [
      "error", {
        "endOfLine": "auto"
      }
    ],
    "no-unused-expressions": [
      "error",
      {
        "allowShortCircuit": true,
        "allowTernary": true,
        "allowTaggedTemplates": true
      }
    ],
    "no-use-before-define": ["off"],
    "react/jsx-one-expression-per-line": ["off"],
    "react/jsx-props-no-spreading": ["off"],
    "react/button-has-type": ["off"],
    "react/require-default-props": ["off"],
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "args": "none"
      }
    ],
    "react/jsx-filename-extension": [
      2,
      { "extensions": [".js", ".jsx", ".ts", ".tsx"] }
    ]
  }
}
```

- root에 .eslintignore 파일 생성 및 내용 추가

```
build/*
public/*
node_modules/*
```

# Prettier

- 코드 스타일 포맷팅
- 다른 사람과 협업해서 작업할 때, 코딩 스타일을 맞춰야 한다. (안그럼, Git에서 Conflict 또는 불필요한 Commit)
- Prettier Extension 설치
- root에 .prettierrc 파일 생성 및 내용 추가

```
{
  "printWidth": 120,
  "tabWidth": 2,
  "trailingComma": "all",
  "bracketSpacing": true,
  "singleQuote": true,
  "arrowParens": "always",
  "semi": true
}
```

- Go - Go to file - settings.json에 내용 추가

```
  "[typescript]": {
    "editor.formatOnSave": true
  },
  "[typescriptreact]": {
    "editor.formatOnSave": true
  },
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```

- root에 .prettierignore 파일 생성 및 내용 추가

```
build/*
public/*
node_modules/*
```

- 상기 (ESLint & Prettier) 설정 후 Reload VSCode

# husky

- Code quality를 위해 git에 commit & push 하기 전, hook을 걸어 특정한 action을 하도록 만들어주는 tool
- npm i -D husky
- npm set-script prepare "husky install" (package.json script에 prepare 명령어 생성)
- npm run prepare (root에 .husky 디렉토리 생성)
- npx husky add .husky/pre-commit "npm run eslint" (.husky/pre-commit file 생성)
- npx husky add .husky/pre-push "npm run test:ci" (.husky/pre-push file 생성)
- package.json 수정

```
  "scripts": {
    // ...
    "prepare": "husky install",
    "eslint": "eslint .",
    "test:ci": "react-scripts test --watchAll=false"
  },
```

- commit (Check ESLint) & push (Check Test) 확인

# package.json staging

- npm i cross-env
- package.json 수정

```
  "scripts": {
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "dev": "cross-env REACT_APP_ENV=dev react-scripts start",
    "qa": "cross-env REACT_APP_ENV=qa react-scripts start",
    "prod": "cross-env REACT_APP_ENV=prod react-scripts start",
    "build:dev": "cross-env REACT_APP_ENV=dev react-scripts build",
    "build:qa": "cross-env REACT_APP_ENV=qa react-scripts build",
    "build:prod": "cross-env REACT_APP_ENV=prod react-scripts build"
  },
```

- src/environment.ts 파일 생성 및 내용 추가

```
const environment: { baseUrl: string | undefined } = {
  baseUrl: 'http://localhost:3000',
};

if (process.env.REACT_APP_ENV === 'dev') {
  environment.baseUrl = process.env.REACT_APP_DEV_API;
}

if (process.env.REACT_APP_ENV === 'qa') {
  environment.baseUrl = process.env.REACT_APP_QA_API;
}

if (process.env.REACT_APP_ENV === 'prod') {
  environment.baseUrl = process.env.REACT_APP_PROD_API;
}

export default environment;
```

- root에 .env 파일 생성 및 내용 추가

```
REACT_APP_DEV_API=DEV_API_ADDRESS
REACT_APP_QA_API=QA_API_ADDRESS
REACT_APP_PROD_API=PROD_API_ADDRESS
```

프로젝트 structure 참고 (interface, component, Styled.component.tsx, **test**)
(O) component children props type => JSX.Element | JSX.Element[];
(O) -webkit-line-clamp: 3; (product name field)
Type Partial<User> Mapping!
testing (axios / redux / cypress?)
(O) react router dom (lazy)
slice...
(O) StyledComponent? ClassNames & Bootstrap? (StyledComponent 사용하면 media query 사용해야 하는데, 고정 값으로 사용토록 ㄱㄱ)
input search. (reusable, reuse slice const)
(O) dotenv
bestbuy api
(O) path not .. .. => src/
type enum? Action 아우르는거
axios 기본 response type / parsed type
redux를 slice랑 기본꺼랑 따로 만들어볼까? (jph는 redux&saga / bestbuy는 slice ??) => 그냥 bestbuy한개로 slice랑 redux기본 만들어보자
login fake로 넣자
action reducer saga (testing) 해 말어?
(O) authReducer => 기본 / bestbuyReducer => immer
