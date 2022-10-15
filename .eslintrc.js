module.exports = {
  parser: '@typescript-eslint/parser', 
  env: {
    // 您的环境变量（包含多个预定义的全局变量）
    // Your environments (which contains several predefined global variables)
    //
    // browser: true,
    // node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // 您的全局变量（设置为 false 表示它不允许被重新赋值）
    // Your global variables (setting to false means it's not allowed to be reassigned)
    //
    // myGlobal: false
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    }
  },
  plugins: ["react"],
  rules: {
    // 自定义您的规则
    // Customize your rules
    // "react/jsx-no-useless-fragment": "off",
    // "react/static-property-placement": "off",
    // "react/sort-comp": "off",
    // "grouped-accessor-pairs": "off",
    // "no-constructor-return": "off",
    // "max-params": "off",
    // "no-dupe-else-if": "off",
    // "no-setter-return": "off",
    // "comma-dangle": ["error", "only-multiline"], // 允许使用拖尾逗号
    // "space-infix-ops": ["error"], // 允许 中缀运算符周围有空格
    // "no-callback-literal": ["off"], // 允许使用callback
    // "space-unary-ops": ["off"], // 允许：++、--、!、!!、new等
    // "no-case-declarations": ["off"], // 允许在switch中使用定义变量
    // "no-extra-semi": 2, // 禁止使用分号
    // "no-var": 2, // 使用let和const代替var
    // "no-unused-vars": 0, // 未被使用的变量
    // "no-mixed-spaces-and-tabs": 1, // 禁止混用tab和空格
    // "keyword-spacing": 0, // 关键字左右的空格
    // "forbid-prop-types": 0, // 不强制使用props类型验证
    // "react/jsx-boolean-value": "off", // 不是用多余布尔值转换
    // "no-invalid-this": "off",
    // "indent": ["error", 4],
    // "react/jsx-indent": ["error", 4],
    // "eqeqeq": "off",
    // "camelcase": "off",
    // "no-extra-boolean-cast": "off",
    // "padded-blocks": "off",
    // "eol-last": "off",
    // "no-useless-escape": "off",
    // "no-useless-constructor": "off",
    // "semi": ["error", "never"],
    // "arrow-parens": ["error", "as-needed"],
    // "no-multiple-empty-lines": ["error", { max: 1 }],
    // "space-before-function-paren": ["error", "always"],
    // "no-trailing-spaces": ["error", { skipBlankLines: true }],
    // "jsx-quotes": ["error", "prefer-single"],
    // "no-unreachable": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // "no-console": "off",
    // "no-eval": "off",
    // "prefer-const": "off",
    // "react/prop-types": "off",
    // "react/no-array-index-key": "off",
    // "react/self-closing-comp": ["error", { component: true, html: false }],
    // "react/jsx-tag-spacing": ["error", { beforeSelfClosing: "always" }],
    // "react/jsx-filename-extension": [0, { "extensions": [".js", ".jsx","ts","tsx"] }],
    // "react/jsx-indent-props": ["error", 4]
  }
};
