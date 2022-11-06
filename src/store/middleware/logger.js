export const loggerMiddleware = (store) => (next) => (action) => {
    if(!action.type) {
     return next(action);
    }
    console.log('TYPE', action.type);
    console.log(' PAYLOAD', action.payload);
    console.log('CURRENT STATE', store.getState());
    next(action);
    console.log('NEXT STATE', store.getState());
 }