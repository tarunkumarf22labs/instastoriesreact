import React from 'react';
import { GlobalCtx } from '../interfaces';

export const initialContext = {
	defaultInterval: 4000,
	width: 440,
	height: '100vh',
};

const GlobalContext = React.createContext<GlobalCtx>(initialContext);

export default GlobalContext;
