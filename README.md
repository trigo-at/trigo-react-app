# trigo-react-app
Heavily opinionated react app boilerplate

## Install

`yarn add trigo-react-app`

## Usage

```
import { ReactApplication } from 'trigo-react-app';

const reducers = {
	auth: authReducer,
	demo: demoReducer,
	...
};

<ReactApplication reducers={reducers}>
	<App />
</ReactApplication>
```
