import {Response} from 'express';

export interface Settings {
  filterCompleted: boolean,
  orderBy: any,
  orderDirection: 1 | -1,
  filter: boolean
  dark: boolean
}

export const sessionUserSettings = (req:any, res:Response, next: (err?: any) => void) => {
     const userSettings = req.session?.userSettings || {
         orderBy: 'title',
         orderDirection: -1,
         dark: false,
         filterCompleted: false
     };

    const {orderBy, toggleDarkMode, filterCompleted} = req.query;

     if (orderBy) {
        if (orderBy === req.session.userSettings?.orderBy) {
            userSettings.orderDirection *= -1;
        }
        userSettings.orderBy = orderBy as string;
    }

    if (toggleDarkMode) {
        userSettings.dark = !userSettings.dark;
    }

    if (filterCompleted) {
        userSettings.filterCompleted = !userSettings.filterCompleted;
    }

    req.session.userSettings = userSettings;
    next();
};
