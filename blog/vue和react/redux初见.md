> redux简单介绍及taro环境下的react-redux建立

# react-redux
> 本笔记参考[Redux 入门教程（一）：基本用法](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)，并与vuex相互比较来理解react-redux，并搭建一个基本的demo。
## 基本概念
### Store

Store，理解为仓库，对应vuex里的state，为数据储存的容器。
`react-redux`通过`createStore`的API来初始化Store。

``` js
import { createStore } from 'redux';
const demo = (state,action)=>{
  switch(action.type){
    case 'add':
      return {
        ...state,
        num:state.num+1
      }
    default:
      return state
  }
}
const store = createStore(demo)
```
### State

State，获取当前Store的状态，对应vuex里的getter。
通过`Store.getState()`获取当前State。
``` js
//紧跟上段代码
import { getState } from 'redux';
const state = store.getState()
```

### Action

Action，执行一次行为，引起State变化。是一个对象，其中`type`为这次行为的类型，其余属性为附带的参数。对应vuex里的Mutation。
一般为会用一个函数去生成Action。
``` js 
const add = num => ({
  type: 'add',
  num
});
```

### Dispatch
Dispatch，调用Action，间接操作了State变化。
通过`Store.dispatch(Action)`来执行Dispatch。
``` js
store.dispatch(add(10))
```

### Reducer
Reducer，接收当前State和Action，更新本次State。这里要注意，这里返回的State接收的State类型一致。
在调用dispatch时，其实就是运行了reducer,通常根据action来创建switch，通过不同的action来允许路线的结果。
Store代码里的demo就是一个reducer

### Subscribe
Subscribe，当State发生变化时，将调用
subscribe里的内容，相当于监听。并且Subscribe是一个管道，有先后的顺序。`react-redux`就是在这个阶段重新渲染页面。
``` js
  store.subscribe(() => {
    console.log(store.getState());
  });
```
### combineReducers
用于合成Reducer，对应vuex里的module。
``` js
import { combineReducers } from "redux";
const reducers = combineReducers({
  demo1,
  demo2
})
```

## 代码实操
这里是在一个taro中建立新的redux。
### yarn
```
yarn add -D react-redux redux redux-logger @types/react-redux @types/redux-logger @tarojs/redux @tarojs/redux-h5
```
### 文件夹结构

```
├── src                      源码目录
|   ├── pages                页面文件目录
|   |   └── demo             demo 页面目录
|   |       └── index.tsx    demo 页面逻辑
|   ├── store                redux 文件目录
|   |   ├── actions          actions 页面目录
|   |   |   └── counter.ts   counter-action 文件
|   |   ├── types            actions 页面目录
|   |   |   └── counter.ts   counter-type 文件
|   |   ├── reducers          actions 页面目录
|   |   |   ├── counter.ts   counter-reducer 文件
|   |   |   └── index  .ts   combineReducers 
|   |   |── type.ts          State-type
|   |   └── index.ts         createStore
|   └── app.tsx              项目入口文件
└── package.json
```

### 声明类型
``` ts
// @/store/types/counter.ts

export enum ECounterAction {
  ADD,
  MINUS
}
export interface ICounterState {
  num: number;
}
export interface ICounterActionAdd {
  type: ECounterAction.ADD;
  num: number;
}
export interface ICounterActionMinus {
  type: ECounterAction.MINUS;
  num: number;
}
export type CounterAction = ICounterActionAdd | ICounterActionMinus;

```
```ts
// @/store/types.ts
import { ICounterState } from "./types/counter";

export interface IRootState {
  counter: ICounterState;
}

``` 
### 建立reducer

``` ts
// @/store/reducers/counter.ts
import { ICounterState, CounterAction, ECounterAction } from "../types/counter";
const COUNTER_STATE: ICounterState = {
  num: 0,
};

export default function counter(state = COUNTER_STATE, action: CounterAction) {
  switch (action.type) {
    case ECounterAction["ADD"]:
      return {
        ...state,
        num: state.num + action.num,
      };
    case ECounterAction["MINUS"]:
      return {
        ...state,
        num: state.num - action.num
      };
    default:
      return state;
  }
}
```

### 建立action

```ts
// @/store/actions/counter.ts
import {
  ECounterAction,
  ICounterActionAdd,
  ICounterActionMinus
} from "../types/counter";

export const add = (num: number): ICounterActionAdd => ({
  type: ECounterAction["ADD"],
  num
});

export const minus = (num: number): ICounterActionMinus => ({
  type: ECounterAction["MINUS"],
  num
});

```

### 合并reducer

```ts
// @/store/reducers/index.ts
import { combineReducers } from "redux";
import counter from "./counter";

export default combineReducers({
  counter
});

```

### 添加中间件并创建store
``` ts
// @/store/index.ts
import { createStore, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import rootReducer from "./reducers";

const enhancer = compose(applyMiddleware(createLogger()));

export default function configStore() {
  const store = createStore(rootReducer, enhancer);
  return store;
}

```

### react组件调用(hooks写法)

```tsx
// @/pages/demo/index.tsx
import React, { FC } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, Button, Text } from "@tarojs/components";

import { IRootState } from "@/store/type";
import { ICounterState } from "@/store/types/counter";
import { add, minus } from "@/store/actions/counter";

const Index: FC = () => {
  const dispatch = useDispatch();
  const counter = useSelector<IRootState, ICounterState>(
    state => state.counter
  );
  return (
    <View>
      <Button onClick={() => dispatch(add(10))}>+</Button>
      <Button onClick={() => dispatch(minus(10))}>-</Button>
      <Button
        onClick={() =>
          setTimeout(() => {
            dispatch(add(10));
          }, 2000)
        }
      >
        +
      </Button>
      <Text>{counter.num}</Text>
    </View>
  );
};
export default Index;
```
