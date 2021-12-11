---
date: '2021-12-08'
title: 'Cómo configurar Prettier y ESLint en #VSCode#'
tags: ['vscode']
snippet: 'Cómo configurar Prettier y ESLint en #VSCode#'
layout: ../layouts/Posts.astro
---

Son 2 cosas, los _formatters_, y los _linters_

El primero nos formatea el código siguiendo unos estándares que convierten JavaScript en un lenguaje ordenado, y el segundo nos vigilan nuestro código señalando errores, esto es, antes de ejecutar el programa

Cuando te acostumbras a esto, irte a lenguajes que no tienen estas ventajas es simplemente un atraso

El _formatter_ más famoso es [prettier](https://github.com/prettier/prettier), y el linter más famoso es [eslint](https://github.com/eslint/eslint) (aunque también es un _formatter_)

Para su instalación, lo más rápido es incluir en nuestro `package.json` los paquetes de `eslint` y `prettier` y hacerlo bajo _devDependencies_, ya que son paquetes que utilizaremos para controlar nuestro código pero no los necesitaremos para que nuestro código se ejecute

Y aparte de los paquetes evidentes, también incluimos el [babel-eslint](https://github.com/babel/babel-eslint) que nos sirve para incluir características más nuevas o experimentales que ESLint no soporta, [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react) para añadir normas específicas para React, y [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier), que nos servirá para desactivar toda la parte de eslint que pueda interferir con `prettier`

```json
  "devDependencies": {
    "eslint": "*",
    "prettier": "*",
    "babel-eslint": "*",
    "eslint-config-prettier": "*",
    "eslint-plugin-react": "*"
  },
```

O hacerlo con `yarn`

```bash
yarn add --dev eslint prettier babel-eslint eslint-config-prettier eslint-plugin-react
```

Para configurarlo lo primero es decirles a `eslint` y `prettier` que se entiendan, y para eso creas el archivo `.eslintrc.json` que en mi caso es el siguiente

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["prettier"],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": ["react"],
  "rules": {
    "strict": 0,
    "indent": ["error", 2],
    "semi": ["error", "never"]
  }
}
```

O la que utilizo ahora para `astro` sin preocuparme de babel ni react

```json
{
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": ["plugin:prettier/recommended"],
  "plugins": ["prettier"],
  "rules": {
    "strict": 0
  },
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  }
}
```

Aquí tienes la [documentación](https://eslint.org/docs/user-guide/configuring)

Y para prettier tienes el archivo `.prettierrc`, donde yo modifico un par de cosas que a mi me molestan

```json
{
  "semi": false,
  "singleQuote": true,
  "arrowParens": "avoid",
  "printWidth": 120
}
```

Aquí tienes la [documentación](https://prettier.io/docs/en/options.html)

Luego para _vscode_ vamos con las extensiones

- [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
